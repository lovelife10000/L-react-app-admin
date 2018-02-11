import React, {Component} from 'react'
import {AppConfig} from '../../../../../config/app.config'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../../actions'
import {bindActionCreators} from 'redux'
// import ColorfulEditorExampleTwitter from '../../../../UI/Editor/ColorfulEditorExampleTwitter'
// import UploadDocImage from './UploadDocImage'
// import Multiple from './Multiple'
import BreadcrumbComp from '../../../../UI/BreadcrumbComp'
import {
  Form, Input, Button, Card, Radio, Select, Switch, Col
} from 'antd';
import {EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import {withRouter} from 'react-router-dom'

const {TextArea} = Input;
// import styles from './style.less';
const {Option} = Select;
const FormItem = Form.Item;


const mapStateToProps = state => {
  return {
    categories: state.categories.toJS()
  }
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
};

@Form.create()
class AddDoc extends Component {

  constructor(props) {
    super(props)
    this.addUserGroup = this.addUserGroup.bind(this)
    this.state = {
      editorState: EditorState.createEmpty(),
    }
  }


  static propTypes = {
    allUserGroups: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    dirty: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    form: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    isError: PropTypes.func,
  };


  componentDidMount() {

    const {actions, categories} = this.props

    if (categories.length < 1) {
      actions.getCategories()
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
  handleCategory = (rule, value, callback) => {
    if (!value) {
      callback('必须选择一项')
    }
    callback()
  }
  handleVisitNum = (rule, value, callback) => {
    if ((typeof Number(value) !== 'number') || (value % 1 !== 0) || (value > 100000 || value < 1)) {
      callback('访问数格式不正确')
    }
    callback()
  }
  handleLikeNum = (rule, value, callback) => {
    if ((typeof Number(value) !== 'number') || (value % 1 !== 0) || (value > 100000 || value < 1)) {
      callback('点赞数格式不正确')
    }
    callback()
  }
  handleKeywords = (rule, value, callback) => {
    if (value.length > 100) {
      callback('关键词太长了')
    }
    callback()
  }

  handleSubmit = (e) => {
    console.log('allUserGroups is 3')
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.addDoc(values)
      }
    });
  }

  isError(name) {
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
    const {categories} = this.props;

    const {editorState} = this.state;
    const {getFieldDecorator, getFieldValue} = this.props.form;

    return (
      <Card bordered={false}>
        <BreadcrumbComp category={AppConfig.userManage[1]} item={AppConfig.addUserGroup[1]}/>


        <Form
          onSubmit={this.handleSubmit}
          hideRequiredMark
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


          <Form.Item
            {...formItemLayout}
            label="分类"
            validateStatus={this.isError('category') ? 'error' : ''}
            help={this.isError('category') || ''}
          >

            <Col span={8}>
              <Form.Item validateStatus="error">
                {getFieldDecorator('firstCate', {
                  rules: [{
                    required: true,
                    validator: this.handleCategory
                  }],
                })(<Select placeholder="请选择" onChange={this.handleSelectChange}>
                  {
                    categories.filter((item) => item.parent_category_id == '').map((item, index) => (
                      <Option key={index} value={item._id}>{item.name}</Option>
                    ))
                  }
                </Select>)}
              </Form.Item>
            </Col>

            {
              getFieldValue('firstCate')&&(categories.filter((item) =>item.parent_category_id === getFieldValue('firstCate')).length>0)  ?
                <div>
                  <Col span={1}>
                    <span style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>
                     -
                    </span>
                  </Col>
                  <Col span={7}>
                    <Form.Item validateStatus="error">
                      {getFieldDecorator('secondCate', {
                        rules: [{
                          required: true,
                          validator: this.handleCategory
                        }],
                      })(
                        <Select placeholder="请选择" onChange={this.handleSelectChange2}>
                          {
                            categories.filter((item) => {console.log('66',getFieldValue('firstCate'));return item.parent_category_id === getFieldValue('firstCate')}).map((item, index) => (
                              <Option key={index} value={item._id}>{item.name}</Option>
                            ))
                          }

                        </Select>)}
                    </Form.Item>
                  </Col>
                </div> : ''
            }

            {getFieldValue('secondCate')&&(categories.filter((item) =>item.parent_category_id === getFieldValue('secondCate')).length>0) ?
              <div>
                <Col span={1}>
                  <span style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>
                  -
                  </span>
                </Col>
                <Col span={7}>
                  <Form.Item validateStatus="error">
                    {getFieldDecorator('thirdCate', {
                      rules: [{
                        required: true,
                        validator: this.handleCategory
                      }],
                    })(
                      <Select placeholder="请选择" >
                        {
                          categories.filter((item) => {console.log('77',getFieldValue('secondCate'));return item.parent_category_id === getFieldValue('secondCate')}).map((item, index) => (
                            <Option key={index} value={item._id}>{item.name}</Option>
                          ))
                        }
                      </Select>)}
                  </Form.Item>
                </Col>
              </div> : ''
            }


          </Form.Item>


          <FormItem
            {...formItemLayout}
            label="类型"
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
          >
            <div>
              {getFieldDecorator('type', {
                initialValue: '1',
              })(
                <Radio.Group>
                  <Radio value="1">已发布</Radio>
                  <Radio value="2">待审核</Radio>
                  <Radio value="3">未通过</Radio>
                  <Radio value="4">草稿箱</Radio>
                </Radio.Group>
              )}

            </div>
          </FormItem>


          <FormItem
            {...formItemLayout}
            label="置顶"
          >
            {getFieldDecorator('top', {valuePropName: 'checked'})(
              <Switch/>
            )}
          </FormItem>


          <FormItem
            {...formItemLayout}
            label="热门"
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
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
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
              <Input placeholder="来源"/>
            )}
          </FormItem>


          <FormItem
            {...formItemLayout}
            label="访问数"
            validateStatus={this.isError('visitNum') ? 'error' : ''}
            help={this.isError('visitNum') || ''}
          >
            {getFieldDecorator('visitNum', {
              rules: [{
                validator: this.handleVisitNum
              }],
            })(
              <Input placeholder="访问数"/>
            )}
          </FormItem>


          <FormItem
            {...formItemLayout}
            label="点赞数"
            validateStatus={this.isError('likeNum') ? 'error' : ''}
            help={this.isError('likeNum') || ''}
          >
            {getFieldDecorator('likeNum', {
              rules: [{
                validator: this.handleLikeNum
              }],
            })(
              <Input placeholder="点赞数"/>
            )}
          </FormItem>


          <FormItem
            {...formItemLayout}
            label="关键词"
            validateStatus={this.isError('keywords') ? 'error' : ''}
            help={this.isError('keywords') || ''}
          >
            {getFieldDecorator('keywords', {
              rules: [{
                validator: this.handleKeywords
              }],
            })(
              <Input placeholder="关键词"/>
            )}
          </FormItem>


          <Form.Item
            {...formItemLayout}
            label="描述"
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

            {getFieldDecorator('remark', {
              rules: [{
                message: '超过100字符',
                max: 100
              }],
            })(
              <TextArea style={{minHeight: 32}} placeholder="请输入摘要" rows={4}/>
            )}
          </Form.Item>


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

export default connect(mapStateToProps, mapDispatchToProps)(AddDoc)