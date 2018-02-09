import React, {Component} from 'react'
import {AppConfig} from '../../../../../config/app.config'
import * as Actions from '../../../../../actions'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {
  Form, Input, Button, Card, Radio, Select,
} from 'antd';
import BreadcrumbComp from '../../../../UI/BreadcrumbComp'
// import styles from './style.less';
const {Option} = Select;
const FormItem = Form.Item;



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
class AddUserGroup extends Component {
  constructor(props) {
    super(props)
    this.addUserGroup = this.addUserGroup.bind(this)
  }


  static propTypes = {
    allUserGroups: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    dirty: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
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

  addUserGroup(data) {
    const {actions} = this.props
    actions.addUserGroup(data)
  }

  handleName = (rule, value, callback) => {
    if (!value) {
      callback('用户组名称不能为空')
    }
    if (!/^[\u4e00-\u9fa5]{3,10}$/.test(value)) {
      callback('无效的组名称')
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  }
  handleGroup = (rule, value, callback) => {
    if (!value) {
      callback('必须选择一项')
    }


    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  }
  handleSubmit = (e) => {
    console.log('allUserGroups is 3')
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.addUserGroup(values)
      }
    });
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

    allUserGroups.unshift({
      _id: '1',
      name: '无',
      power: [],
      parent_user_group_id: '',
      status: true
    });
    console.log('allUserGroups is2', allUserGroups)

    const {getFieldDecorator, isFieldTouched, getFieldError} = this.props.form;
    const nameError = isFieldTouched('name') && getFieldError('name');
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
            label="组名称"
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, pattern: /^[\u4e00-\u9fa5]{3,10}$/,
                validator: this.handleName
              }],
            })(
              <Input placeholder="组名称"/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddUserGroup))