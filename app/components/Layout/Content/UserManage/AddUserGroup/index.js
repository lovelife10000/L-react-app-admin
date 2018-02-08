import React, {Component} from 'react'
import {AppConfig} from '../../../../../config/app.config'
import * as Actions from '../../../../../actions'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {
  Form, Input, Button, Card, Radio,Select,
} from 'antd';
import BreadcrumbComp from '../../../../UI/BreadcrumbComp'
// import styles from './style.less';
const { Option } = Select;
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
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const {allUserGroups} = this.props;
    console.log('allUserGroups is', allUserGroups)
    allUserGroups.unshift({
      _id: '',
      name: '无',
      power: [],
      parent_user_group_id: '',
      status: true
    });
    console.log('allUserGroups is2', allUserGroups)
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
          >

            <Input placeholder="组名称"/>

          </FormItem>
          <Form.Item
            {...formItemLayout}
            label="用户组"
          >

            <Select placeholder="请选择">
              <Option value="无">无</Option>
            </Select>

          </Form.Item>
          <FormItem
            {...formItemLayout}
            label="状态"
            help=""
          >
            <div>

              <Radio.Group>
                <Radio value="1">启用</Radio>
                <Radio value="2">禁用</Radio>
              </Radio.Group>


            </div>
          </FormItem>
          <FormItem {...submitFormLayout} style={{marginTop: 32}}>
            <Button type="primary" htmlType="submit" loading={777}>
              提交
            </Button>

          </FormItem>
        </Form>
      </Card>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddUserGroup))