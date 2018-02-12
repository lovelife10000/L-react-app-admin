import React, {Component} from 'react'
import {AppConfig} from '../../../../../config/app.config'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../../actions'
import {bindActionCreators} from 'redux'
// import UploadDocImage from './UploadDocImage'
// import Multiple from './Multiple'
import BreadcrumbComp from '../../../../UI/BreadcrumbComp'
import {
  Form, Input, Button, Card, Radio, Select, Switch, Col, message,
} from 'antd';
import {EditorState, convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import {withRouter} from 'react-router-dom'
import UploadDocImage from './UploadDocImage'

const {TextArea} = Input;
// import styles from './style.less';
const {Option} = Select;
const FormItem = Form.Item;


const mapStateToProps = state => {
  return {
    categories: state.categories.toJS(),
    tagList: state.tagList.toJS(),
  }
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
};

// @Form.create()
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
    categories: PropTypes.array.isRequired,
    isError: PropTypes.func,
  };


  componentDidMount() {

    const {actions, categories, tagList} = this.props

    if (categories.length < 1) {
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
    console.log('what is base64', base64)
    this.setState({
      image: base64
    })
  }

  handleSubmit = (e) => {
    const that = this;
    console.log('allUserGroups is 3')
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const my = that;
      if (!err) {
        console.log('Received values of form: ', values);
        let category = values.thirdCate || values.secondCate || values.firstCate;
        let image = this.state.image;
        const data = Object.assign({}, values, {content: this.getContent(), category, image})
        console.log('Received values of form 2: ', data);
        this.props.actions.addDoc(data).then(function (result) {
          if (result.success) {
            my.success(result.msg)
          }
        }
        );
      }
    });
  }

  isError(name) {
    console.log('touch', name, this.props.form.isFieldTouched(name), this.props.form.getFieldError(name))
    return this.props.form.isFieldTouched(name) && this.props.form.getFieldError(name);
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleSelectChange = (value) => {
    this.props.form.resetFields('secondCate')
  }
  handleSelectChange2 = (value) => {
    this.props.form.resetFields('thirdCate')
  }
  success = (msg) => {
    message.success(msg);
  };

  error = (msg) => {
    message.error(msg);
  };

  warning = (msg) => {
    message.warning(msg);
  };

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
    };
    const contentLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 10},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 24},
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };
    const {categories, tagList} = this.props;
    const {editorState} = this.state;
    const {getFieldDecorator, getFieldValue,} = this.props.form;

    return (
      <Card bordered={false}>
        <BreadcrumbComp category={AppConfig.userManage[1]} item={AppConfig.addUserGroup[1]}/>


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
                })(<Select placeholder="请选择" onChange={this.handleSelectChange}>
                  {
                    categories.filter((item) => item.parent_category_id == '').map((item, index) => (
                      <Option key={index} value={item._id}>{item.name}</Option>
                    ))
                  }
                </Select>)}
              </FormItem>
            </Col>

            {
              getFieldValue('firstCate') && (categories.filter((item) => item.parent_category_id === getFieldValue('firstCate')).length > 0) ?
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
                        <Select placeholder="请选择" onChange={this.handleSelectChange2}>
                          {
                            categories.filter((item) => {
                              console.log('66', getFieldValue('firstCate'));
                              return item.parent_category_id === getFieldValue('firstCate')
                            }).map((item, index) => (
                              <Option key={index} value={item._id}>{item.name}</Option>
                            ))
                          }

                        </Select>)}
                    </FormItem>
                  </Col>
                </div> : ''
            }

            {getFieldValue('secondCate') && (categories.filter((item) => item.parent_category_id === getFieldValue('secondCate')).length > 0) ?
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
                          categories.filter((item) => {
                            console.log('77', getFieldValue('secondCate'));
                            return item.parent_category_id === getFieldValue('secondCate')
                          }).map((item, index) => (
                            <Option key={index} value={item._id}>{item.name}</Option>
                          ))
                        }
                      </Select>)}
                  </FormItem>
                </Col>
              </div> : ''
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
            validateStatus={this.isError('visitNum') ? 'error' : ''}
            help={this.isError('visitNum') || ''}
          >
            {getFieldDecorator('visitNum', {
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
            validateStatus={this.isError('likeNum') ? 'error' : ''}
            help={this.isError('likeNum') || ''}
          >
            {getFieldDecorator('likeNum', {
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


          <UploadDocImage formItemLayout={formItemLayout} getImageBase64={this.getImageBase64.bind(this)}/>


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
              添加
            </Button>

          </FormItem>

        </Form>
      </Card>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddDoc))