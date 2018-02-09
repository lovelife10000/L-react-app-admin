import React, {Component} from 'react'
import {AppConfig} from '../../../../../config/app.config'
import * as Actions from '../../../../../actions'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  Form, Input, Button, Card, Radio, Select,
} from 'antd';
import BreadcrumbComp from '../../../../UI/BreadcrumbComp'
// import styles from './style.less';
const {Option} = Select;
const FormItem = Form.Item;
const { TextArea } = Input;







const mapStateToProps = state => {
  return {
    allUserGroups: state.allUserGroups.toJS()
  }
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
};

@Form.create()
class AddUser extends Component {

  constructor(props) {
    super(props)
    this.addUser=this.addUser.bind(this)
  }

  static propTypes = {
    handleSubmit: PropTypes.func,
    actions: PropTypes.object.isRequired,
    allUserGroups: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
  };

  componentDidMount() {

    const {actions, allUserGroups} = this.props
    console.log('AddUserGroup中fetchData', allUserGroups)
    if (allUserGroups.length < 2) {
      console.log('AddUserGroup中fetchData2')
      actions.getAllUserGroups()
    }
  }

  addUser(payload){
    console.log('payload',payload)
    this.props.actions.addUser(payload)
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
    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };
    const {allUserGroups} = this.props;


    if(allUserGroups.length < 1){
      allUserGroups.unshift({
        _id: '1',
        name: '无',
        power: [],
        parent_user_group_id: '',
        status: true
      });
      console.log('allUserGroups is2', allUserGroups)
    }


    const {getFieldDecorator, isFieldTouched, getFieldError} = this.props.form;
    const nameError = isFieldTouched('name') && getFieldError('name');
    return (
      <Card bordered={false}>
        <BreadcrumbComp category={AppConfig.userManage[1]} item={AppConfig.addUser[1]}/>
        <Form
          onSubmit={this.handleSubmit}
          hideRequiredMark
          style={{marginTop: 8}}
        >
          <FormItem
            {...formItemLayout}
            label="用户名"
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
          >
            {getFieldDecorator('username', {
              rules: [{
                required: true, pattern: /^[\u4e00-\u9fa5]{3,10}$/,
                validator: this.handleName
              }],
            })(
              <Input placeholder="用户名"/>
            )}
          </FormItem>


          <Form.Item
            {...formItemLayout}
            label="用户组"
          >

            {getFieldDecorator('parent_user_group_id', {
              rules: [{
                required: true,
                validator: this.handleGroup
              }],
            })(
              <Select defaultValue="1" placeholder="请选择">
                {
                  allUserGroups.map((item, index) => (
                    <Option key={index} value={item._id}>{(item.parent_user_group_id ? '\u00A0\u00A0\u00A0\u00A0' : '') + item.name}</Option>
                  ))
                }

              </Select>)}
          </Form.Item>


          <FormItem
            {...formItemLayout}
            label="昵称"
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
          >
            {getFieldDecorator('nickname', {
              rules: [{
                required: true, pattern: /^[\u4e00-\u9fa5]{3,10}$/,
                validator: this.handleName
              }],
            })(
              <Input placeholder="昵称"/>
            )}
          </FormItem>


          <FormItem
            {...formItemLayout}
            label="密码"
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, pattern: /^[\u4e00-\u9fa5]{3,10}$/,
                validator: this.handleName
              }],
            })(
              <Input placeholder="密码"/>
            )}
          </FormItem>


          <FormItem
            {...formItemLayout}
            label="确认密码"
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
          >
            {getFieldDecorator('rePassword', {
              rules: [{
                required: true, pattern: /^[\u4e00-\u9fa5]{3,10}$/,
                validator: this.handleName
              }],
            })(
              <Input placeholder="确认密码"/>
            )}
          </FormItem>


          <Form.Item
            {...formItemLayout}
            label="电话"
          >



            {getFieldDecorator('phone', {
              rules: [{
                required: true, pattern: /^[\u4e00-\u9fa5]{3,10}$/,
                validator: this.handleName
              }],
            })(
              <Input placeholder="电话"/>
            )}
          </Form.Item>


          <Form.Item
            {...formItemLayout}
            label="邮箱"
          >

            {getFieldDecorator('email', {
              rules: [{
                required: true, pattern: /^[\u4e00-\u9fa5]{3,10}$/,
                validator: this.handleName
              }],
            })(
              <Input placeholder="邮箱"/>
            )}
          </Form.Item>


          <Form.Item
            {...formItemLayout}
            label="备注"
          >

            {getFieldDecorator('remark', {
              rules: [{
                message: '超过100字符',
                max:100
              }],
            })(
              <TextArea style={{ minHeight: 32 }} placeholder="请输入备注" rows={4} />
            )}
          </Form.Item>


          <FormItem
            {...formItemLayout}
            label="状态"
            help=""
          >
            <div>
              {getFieldDecorator('status', {
                initialValue: '1',
              })(
                <Radio.Group>
                  <Radio value="1">启用</Radio>
                  <Radio value="2">禁用</Radio>
                </Radio.Group>
              )}

            </div>
          </FormItem>


          <FormItem {...submitFormLayout} style={{marginTop: 32}}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>

          </FormItem>
        </Form>
      </Card>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddUser)