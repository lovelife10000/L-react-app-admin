import React, {Component} from 'react'
import AppConfig from 'config/app'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as Actions from 'actions'
import {bindActionCreators} from 'redux'
import BreadcrumbComp from 'components/Common/BreadcrumbComp'
import {Button, Card, Col, Form, Input, message, Radio, Select, Switch,} from 'antd'
import {convertToRaw, EditorState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import UploadDocImage from 'components/Common/UploadDocImage'
import styles from './index.less'
import _ from 'lodash'

const {TextArea} = Input
const {Option} = Select
const FormItem = Form.Item


const mapStateToProps = state => {
  return {
    categories: state.categories.toJS(),
    tagList: state.tagList.toJS(),
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}


class AddDoc extends Component {

  constructor(props) {
    super(props)
    this.addUserGroup = this.addUserGroup.bind(this)
    this.state = {
      editorState: EditorState.createEmpty(),
      image: ''
    }
  }


    static propTypes = {
      tagList: PropTypes.array.isRequired,
      actions: PropTypes.object.isRequired,
      dirty: PropTypes.bool,
      invalid: PropTypes.bool,
      handleSubmit: PropTypes.func,
      form: PropTypes.object.isRequired,
      categories: PropTypes.object.isRequired,
      isError: PropTypes.func,
    };


    componentDidMount() {

      const {actions, categories, tagList} = this.props

      if (categories.data.length < 1) {
        actions.getCategories()
      }
      if (tagList.length < 1) {
        actions.getTags()
      }
    }

    addUserGroup(data) {
      const {actions} = this.props
      actions.addUserGroup(data)
    }

    handleTitle = (rule, value, callback) => {
      if (!value) {
        callback('标题不能为空')
      }
      if (value.length > 100 || value.length < 3) {
        callback('无效的标题')
      }
      callback()
    }

    getContent = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

    getImageBase64(base64) {

      this.setState({
        image: base64
      })
    }


    handleSubmit = (e) => {
      const that = this
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        const my = that
        if (!err) {
          let category = (values.thirdCate === '0' ? null : values.thirdCate) || (values.secondCate === '0' ? null : values.secondCate) || values.firstCate

          let image = this.state.image
          const data = Object.assign({}, values, {content: this.getContent(), category, image})
          const _data = _.pick(data, ['title', 'abstract', 'category', 'content', 'description', 'from', 'hot', 'image', 'keywords', 'like', 'status', 'tags', 'title', 'top', 'type', 'click'])

          this.props.actions.addDoc(_data).then(function (result) {
            if (result.success) {
              my.success(result.msg)
            }
          }
          )
        }
      })
    }

    isError(name) {
      return this.props.form.isFieldTouched(name) && this.props.form.getFieldError(name)
    }

    onEditorStateChange = (editorState) => {
      this.setState({
        editorState,
      })
    };


    success = (msg) => {
      message.success(msg)
    };

    error = (msg) => {
      message.error(msg)
    };

    warning = (msg) => {
      message.warning(msg)
    };

    //由一级分类id推导二级分类数组
    getTwoLevelCate(idx) {
      const {categories} = this.props
      for (let x of categories.data) {
        if (x.id === idx) {

          return x.children

        }
      }
    }

    //由二级分类id推导三级分类数组
    getThreeLevelCate(idxf, idxs) {


      if (!idxf || !idxs) {
        return false
      }
      const {categories} = this.props


      for (let x of categories.data) {
        if (x.id === idxf) {

          for (let i of x.children) {

            if (i.id === idxs) {

              return i.children
            }
          }


        }
      }
    }

    clearInput() {
      const {form} = this.props
      form.resetFields('firstCate', 'secondCate', 'thirdCate')
    }

    render() {

      const formItemLayout = {
        labelCol: {
          xs: {span: 24},
          sm: {span: 7},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 12},
          md: {span: 10},
        },
      }
      const contentLayout = {
        labelCol: {
          xs: {span: 24},
          sm: {span: 10},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 24},
        },
      }
      const submitFormLayout = {
        wrapperCol: {
          xs: {span: 24, offset: 0},
          sm: {span: 10, offset: 7},
        },
      }
      const {categories, tagList} = this.props
      const {editorState, image} = this.state
      const {getFieldDecorator, getFieldValue,} = this.props.form

      return (
        <Card bordered={false} className={styles.addDoc}>
          <BreadcrumbComp category={AppConfig.docManage[1]} item={AppConfig.addDoc[1]}/>


          <Form
            onSubmit={this.handleSubmit}
            style={{marginTop: 8}}
          >
            <FormItem
              {...formItemLayout}
              label="标题"
              validateStatus={this.isError('title') ? 'error' : ''}
              help={this.isError('title') || ''}
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true,
                  validator: this.handleTitle
                }],
              })(
                <Input placeholder="标题"/>
              )}
            </FormItem>


            <FormItem
              {...formItemLayout}
              label="分类"
              required
            >

              <Col span={8}>
                <FormItem
                  validateStatus={this.isError('firstCate') ? 'error' : ''}
                  help={this.isError('firstCate') || ''}
                >
                  {getFieldDecorator('firstCate', {
                    rules: [{
                      required: true,
                      message: '必须选择一项'
                    }],
                  })(<Select placeholder="请选择" onChange={this.clearInput.bind(this)}>
                    {
                      categories.data.filter((item) => (item.parentId === '0')).map((item, index) => (
                        <Option key={index} value={item.id}>{item.name}</Option>
                      ))
                    }
                  </Select>)}
                </FormItem>
              </Col>

              {
                this.getTwoLevelCate(getFieldValue('firstCate'))
                            &&
                            <div>
                              <Col span={1}>
                                <span style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>
                     -
                                </span>
                              </Col>
                              <Col span={7}>
                                <FormItem
                                  validateStatus={this.isError('secondCate') ? 'error' : ''}
                                  help={this.isError('secondCate') || ''}
                                >
                                  {getFieldDecorator('secondCate', {
                                    rules: [{
                                      required: true,
                                      message: '必须选择一项'
                                    }],
                                  })(
                                    <Select placeholder="请选择">
                                      {
                                        [{
                                          name: '无',
                                          slug: '',
                                          parentId: '0',
                                          id: '0',
                                          level: 1
                                        }].concat(this.getTwoLevelCate(getFieldValue('firstCate'))).map((item, index, arr) => {
                                          return (
                                            <Option key={index} value={item.id}>{item.name}</Option>)
                                        })

                                      }

                                    </Select>)}
                                </FormItem>
                              </Col>
                            </div>
              }
              {
                this.getThreeLevelCate(getFieldValue('firstCate'), getFieldValue('secondCate'))

                            &&
                            <div>
                              <Col span={1}>
                                <span style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>
                                  -
                                </span>
                              </Col>
                              <Col span={7}>
                                <FormItem
                                  validateStatus={this.isError('thirdCate') ? 'error' : ''}
                                  help={this.isError('thirdCate') || ''}
                                >
                                  {getFieldDecorator('thirdCate', {
                                    rules: [{
                                      required: true,
                                      message: '必须选择一项'
                                    }],
                                  })(
                                    <Select placeholder="请选择">
                                      {
                                        [{
                                          name: '无',
                                          slug: '',
                                          parentId: '0',
                                          id: '0',
                                          level: 1
                                        }].concat(this.getThreeLevelCate(getFieldValue('firstCate'), getFieldValue('secondCate'))).map((item, index) => (
                                          <Option key={index} value={item.id}>{item.name}</Option>
                                        ))
                                      }
                                    </Select>)}
                                </FormItem>
                              </Col>
                            </div>
              }


            </FormItem>


            <FormItem
              {...formItemLayout}
              label="类型"
              required
            >
              <div>
                {getFieldDecorator('type', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">文章</Radio>
                    <Radio value="2">页面</Radio>
                  </Radio.Group>
                )}

              </div>
            </FormItem>


            <FormItem
              {...formItemLayout}
              label="状态"
              required
            >
              <div>
                {getFieldDecorator('status', {
                  initialValue: 'published',
                })(
                  <Radio.Group>
                    <Radio value="published">已发布</Radio>
                    <Radio value="waitForVerify">待审核</Radio>
                    <Radio value="noAccess">未通过</Radio>
                    <Radio value="draft">草稿箱</Radio>
                  </Radio.Group>
                )}

              </div>
            </FormItem>


            <FormItem
              {...formItemLayout}
              label="置顶"
              required
            >
              {getFieldDecorator('top', {valuePropName: 'checked'})(
                <Switch/>
              )}
            </FormItem>


            <FormItem
              {...formItemLayout}
              label="热门"
              required
            >
              {getFieldDecorator('hot', {valuePropName: 'checked'})(
                <Switch/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="轮播"
              required
            >
              {getFieldDecorator('banner', {valuePropName: 'checked'})(
                <Switch/>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="标签"
            >
              {getFieldDecorator('tags', {})(
                <Select mode="multiple" placeholder="选择标签">
                  {
                    tagList.map((item, index) => (
                      <Option key={index} value={item.name}>{item.name}</Option>
                    ))
                  }
                </Select>
              )}
            </FormItem>


            <FormItem
              {...formItemLayout}
              label="来源"
              validateStatus={this.isError('from') ? 'error' : ''}
              help={this.isError('from') || ''}
            >
              {getFieldDecorator('from', {})(
                <Input placeholder="如不填，则默认是生成的文档网址"/>
              )}
            </FormItem>


            <FormItem
              {...formItemLayout}
              label="访问数"
              validateStatus={this.isError('click') ? 'error' : ''}
              help={this.isError('click') || ''}
            >
              {getFieldDecorator('click', {
                initialValue: 1,
                rules: [{
                  pattern: /^[1-9]*[1-9][0-9]*$/,
                }],
              })(
                <Input placeholder="如不填，则默认是0"/>
              )}
            </FormItem>


            <FormItem
              {...formItemLayout}
              label="点赞数"
              validateStatus={this.isError('like') ? 'error' : ''}
              help={this.isError('like') || ''}
            >
              {getFieldDecorator('like', {
                initialValue: 1,
                rules: [{
                  pattern: /^[1-9]*[1-9][0-9]*$/,
                }],
              })(
                <Input placeholder="如不填，则默认是0"/>
              )}
            </FormItem>


            <FormItem
              {...formItemLayout}
              label="SEO关键词"
              validateStatus={this.isError('keywords') ? 'error' : ''}
              help={this.isError('keywords') || ''}
            >
              {getFieldDecorator('keywords', {
                rules: [{
                  max: 100,
                  message: '超过100字符',
                }],
              })(
                <Input placeholder="关键词"/>
              )}
            </FormItem>


            <Form.Item
              {...formItemLayout}
              label="SEO描述"
            >

              {getFieldDecorator('description', {
                rules: [{
                  message: '超过100字符',
                  max: 100
                }],
              })(
                <TextArea style={{minHeight: 32}} placeholder="请输入描述" rows={4}/>
              )}
            </Form.Item>


            <Form.Item
              {...formItemLayout}
              label="摘要"
            >

              {getFieldDecorator('abstract', {
                rules: [{
                  message: '超过100字符',
                  max: 100
                }],
              })(
                <TextArea style={{minHeight: 32}} placeholder="请输入摘要" rows={4}/>
              )}
            </Form.Item>


            <UploadDocImage formItemLayout={formItemLayout} getImageBase64={this.getImageBase64.bind(this)}
              data={{previewImg: image}}/>


            <Form.Item
              {...contentLayout}
              label="内容"
            >


              <div>
                <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}
                />
              </div>

            </Form.Item>


            <FormItem {...submitFormLayout} style={{marginTop: 32}}>
              <Button type="primary" htmlType="submit">
                            发布
              </Button>

            </FormItem>

          </Form>
        </Card>
      )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddDoc))