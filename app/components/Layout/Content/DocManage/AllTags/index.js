import React, {Component} from 'react'
import AppConfig from 'config/app'
import * as Actions from 'actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Table, Divider, Icon} from 'antd'
import styles from './index.less'
import BreadcrumbComp from 'components/Common/BreadcrumbComp'

const mapStateToProps = (state) => {
  return {
    tagList: state.tagList.toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

class AllTags extends Component {
  constructor() {
    super()
  }

  static propTypes = {
    tagList: PropTypes.array,
    actions: PropTypes.object.isRequired,
  };

  static fetchData() {
    return [Actions.getAllUsers()]
  }

  componentDidMount() {
    const {actions, tagList} = this.props
    if (tagList.length < 1) {
      actions.getTags()
    }
  }

  render() {
    const {tagList} = this.props
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      render: text => <a href="#">{text}</a>,
    },
    {
      title: '别名',
      dataIndex: 'slug',
    },
    {
      title: '操作', dataIndex: '', key: 'x',
      render: (text, record) => (
        <span>
          <a href="#">编辑</a>
          <Divider type="vertical"/>
          <a href="#">删除</a>
          <Divider type="vertical"/>
          <a href="#" className="ant-dropdown-link">
            更多 <Icon type="down"/>
          </a>
        </span>
      ),
    },]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    }
    return (
      <div className={styles.standardTable}>
        <BreadcrumbComp category={AppConfig.docManage[1]} item={AppConfig.allTags[1]}/>
        <Table
          rowSelection={rowSelection} columns={columns} dataSource={tagList}
        />
      </div>
    )

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTags)
