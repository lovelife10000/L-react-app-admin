import React, {Component} from 'react'
import AppConfig from 'config/app.config'
import * as Actions from 'actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Table , Divider,Icon} from 'antd';
import styles from './index.less';
import BreadcrumbComp from 'components/Common/BreadcrumbComp'

const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers.toJS()
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
};

class AllUsers extends Component {
  constructor() {
    super()
  }

  static propTypes = {
    allUsers: PropTypes.array,
    actions: PropTypes.object.isRequired,
  };

  static fetchData() {
    return [Actions.getAllUsers()]
  }

  componentDidMount() {
    const {actions, allUsers} = this.props
    if (allUsers.length < 1) {
      actions.getAllUsers()
    }
  }

  render() {
    const {allUsers} = this.props
    const columns = [{
      title: '用户名',
      dataIndex: 'username',
      render: text => <a href="#">{text}</a>,
    }, {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '用户组',
      dataIndex: 'user_group',
    },
    {
      title: '文章数量',
      dataIndex: 'article_num',
    },
    {
      title: '注册时间',
      dataIndex: 'register_time',
    }, {
      title: '操作', dataIndex: '', key: 'x',
      render: (text, record) => (
        <span>
          <a href="#">修改用户</a>
          <Divider type="vertical"/>
          <a href="#">删除</a>
          <Divider type="vertical"/>
          <a href="#" className="ant-dropdown-link">
            更多 <Icon type="down"/>
          </a>
        </span>
      ),
    },];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };
    return (
      <div className={styles.standardTable}>
        <BreadcrumbComp category={AppConfig.userManage[1]} item={AppConfig.allUsers[1]}/>
        <Table
          rowSelection={rowSelection} columns={columns} dataSource={allUsers}
        />
      </div>
    )

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
