import React, { Component } from 'react';
import { Table , Divider,Icon,} from 'antd';
import styles from './index.less';
import PropTypes from 'prop-types'
import * as Actions from 'actions'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import BreadcrumbComp from 'components/Common/BreadcrumbComp'
import AppConfig from 'config/app'

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
    allUserGroups: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    category:PropTypes.string,
    item:PropTypes.string,
  };

  static fetchData(){

    return [Actions.getAllUserGroups()]
  }

  componentDidMount() {

    const {actions, allUserGroups} = this.props

    if (allUserGroups.data.length < 2) {
      actions.getAllUserGroups()
    }
  }

    changeToUse(text, record) {
        const {actions} = this.props

        actions.changeToUse({_id: record._id})
    }
    changeToNotUse(text, record) {
        const {actions} = this.props

        actions.changeToNotUse({_id: record._id})

    }


  render() {
    const {allUserGroups} = this.props
    const columns = [{
      title: '组名称',
      dataIndex: 'name',
      render: text => <a href="#">{text}</a>,
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (text) => (text ? '启用' : '禁用')
    }, {
      title: '操作', dataIndex: '', key: 'x',
      render: (text, record) => (
        <span>
          <a href="#">编辑</a>
          <Divider type="vertical" />
            {record.status ? <a href="javascript:void(0)" onClick={this.changeToNotUse.bind(this, text, record)}>禁用</a> :
                 <a href="javascript:void(0)" onClick={this.changeToUse.bind(this, text, record)}>启用</a>}

          <Divider type="vertical" />
          <a href="#">权限分配</a>

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
        <Table rowKey={'name'}
          rowSelection={rowSelection} columns={columns} dataSource={allUserGroups.data}
        />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllUserGroups))