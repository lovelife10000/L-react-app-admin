import React, { Component } from 'react';
import { Table , Divider,Icon} from 'antd';
import styles from './index.less';
import PropTypes from 'prop-types'
import * as Actions from '../../../../../actions'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import BreadcrumbComp from '../../../../UI/BreadcrumbComp'
import {AppConfig} from '../../../../../config/app.config'

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


class AllUserGroups extends Component {
  constructor(props) {
    super(props)

  }

  static propTypes = {
    allUserGroups: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    category:PropTypes.string.isRequired,
    item:PropTypes.string.isRequired,
  };

  static fetchData(){
    console.log('AllUserGroups中fetchData')
    return [Actions.getAllUserGroups()]
  }

  componentDidMount() {

    const {actions, allUserGroups} = this.props
    console.log('AllUserGroups中fetchData')
    if (allUserGroups.length < 2) {
      actions.getAllUserGroups()
    }
  }


  render() {
    const {allUserGroups} = this.props
    const columns = [{
      title: '组名称',
      dataIndex: 'name',
      render: text => <a href="#">{text}</a>,
    }, {
      title: '状态',
      dataIndex: 'user_group_status',
      render: (text) => (text ? '启用' : '禁用')
    }, {
      title: '操作', dataIndex: '', key: 'x',
      render: (text, record) => (
        <span>
          <a href="#">编辑</a>
          <Divider type="vertical" />
          <a href="#">{record.user_group_status ? '禁用' : '启用'}</a>
          <Divider type="vertical" />
          <a href="#">权限分配</a>
          <Divider type="vertical" />
          <a href="#" className="ant-dropdown-link">
            更多 <Icon type="down" />
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
        <BreadcrumbComp category={AppConfig.userManage[1]} item={AppConfig.allUserGroups[1]}/>
        <Table
          rowSelection={rowSelection} columns={columns} dataSource={allUserGroups}
        />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllUserGroups))