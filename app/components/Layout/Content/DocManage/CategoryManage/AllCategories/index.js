import React, {Component} from 'react'
import AppConfig from 'config/app.config'
import * as Actions from 'actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import styles from './index.less';
import BreadcrumbComp from 'components/Common/BreadcrumbComp'
import {Table} from 'antd';

const mapStateToProps = (state) => {
    return {
        categories: state.categories.toJS()
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
};

class AllCategories extends Component {
    constructor() {
        super()
    }

    static propTypes = {
        categories: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    };

    componentDidMount() {
        const {categories} = this.props
        if (categories.length < 1) {
            this.props.actions.getCategories()
        }
    }

    render() {
        const {categories} = this.props

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

            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',
                name: record.name,
            }),
        };
        return (

            <div className={styles.standardTable}>
                <BreadcrumbComp category={AppConfig.docManage[1]} item={AppConfig.allCategories[1]}/>
                <Table
                    rowSelection={rowSelection} columns={columns} dataSource={categories}
                />
            </div>


        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories)