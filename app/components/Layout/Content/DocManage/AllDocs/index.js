import React, {Component} from 'react'
import AppConfig from 'config/app.config'
import * as Actions from 'actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Button, Col, DatePicker, Divider, Form, Input, Row, Select, Table} from 'antd';
import styles from './index.less';
import BreadcrumbComp from 'components/Common/BreadcrumbComp'
import {Link} from "react-router-dom"


const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;

const mapStateToProps = (state) => {
    return {
        allDocs: state.allDocs.toJS(),
        categories: state.categories.toJS(),
        searchDocs: state.searchDocs.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
};

class AllDocs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expand: false,

        };
    }

    static propTypes = {
        allDocs: PropTypes.object,
        actions: PropTypes.object.isRequired,
    };

    static fetchData() {
        return [Actions.getAllUsers()]
    }

    componentDidMount() {
        const {actions, allDocs, categories} = this.props
        if (allDocs.docs.length < 1) {
            actions.getDocs({current: 1, pageSize: 10})
        }
        if (categories.length < 1) {
            this.props.actions.getCategories()
        }

    }


    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const {expand} = this.state;
        this.setState({expand: !expand});
    }

    isError(name) {

        return this.props.form.isFieldTouched(name) && this.props.form.getFieldError(name);
    }


    //由二级分类id推导三级分类数组
    getThreeLevelCate(idxf, idxs) {


        if (!idxf || !idxs) {
            return false
        }
        const {categories} = this.props


        for (let x of categories) {
            if (x.id === idxf) {

                for (let i of x.children) {

                    if (i.id === idxs) {

                        return i.children
                    }
                }


            }
        }
    }

    //由一级分类id推导二级分类数组
    getTwoLevelCate(idx) {
        const {categories} = this.props
        for (let x of categories) {
            if (x.id === idx) {

                return x.children

            }
        }
    }

    onShowSizeChange(current, pageSize) {
        const {actions} = this.props

        actions.getDocs({current, pageSize})
    }

    handleSubmit = (e) => {

        const that = this;

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const my = that;

            if (!err) {

                if (values.title || values.createTime || values.updateTime || ((values.thirdCate === '0' ? false : values.thirdCate) || (values.secondCate === '0' ? false : values.secondCate) || values.firstCate) || values.authorUsernassme) {


                    let category = (values.thirdCate === '0' ? false : values.thirdCate) || (values.secondCate === '0' ? false : values.secondCate) || values.firstCate;


                    const data = {};
                    const str = []
                    if (values.title) {
                        data.title = values.title;
                        str.push('title')
                    }
                    if (values.authorId) {
                        data.authorId = values.authorId;
                        str.push('authorId')
                    }
                    if (values.createTime) {
                        data.createTime = values.createTime;
                        str.push('createTime')
                    }
                    if (values.updateTime) {
                        data.updateTime = values.updateTime;
                        str.push('updateTime')
                    }
                    if (category) {
                        data.category = category;
                        str.push('category')
                    }
                    data.list = str
                    debugger
                    this.props.actions.searchDocs(data)
                }

            }
        });
    }

    changePageIndex(current, pageSize) {
        const {actions} = this.props

        actions.getDocs({current, pageSize})
    }

    changeToHot(text, record) {
        const {actions} = this.props

        actions.changeToHot({_id: record._id})
    }
    changeToNotHot(text, record) {
        const {actions} = this.props

        actions.changeToNotHot({_id: record._id})

    }
    changeToTop(text, record) {
        const {actions} = this.props
        actions.changeToTop({_id: record._id})

    }
    changeToNotTop(text, record) {
        const {actions} = this.props
        actions.changeToNotTop({_id: record._id})

    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 24},
                md: {span: 24},
                lg: {span: 6},
                xl: {span: 6},
                xxl: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 24},
                md: {span: 24},
                lg: {span: 18},
                xl: {span: 18},
                xxl: {span: 18},
            },
        };
        const {allDocs, form, categories, searchDocs} = this.props
        let docs = searchDocs.length > 0 ? searchDocs : allDocs.docs

        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (text, record, index) => (index + 1)
            },
            {
                title: '文档标题',
                dataIndex: 'title',
                key: 'title',
                render: text => <a href="#">{text}</a>,
            },
            {
                title: '所属分类',
                dataIndex: 'category.name',
                key: 'category',
            },

            {
                title: '作者',
                dataIndex: 'authorId.username',
                key: 'authorId',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
                render: (text, record) => (record.type === '1' ? '文章' : '页面')
            },

            {
                title: '是否热门',
                dataIndex: 'hot',
                key: 'hot',
                render: (text, record) => (record.hot ? '是' : '否')
            },
            {
                title: '是否置顶',
                dataIndex: 'top',
                key: 'top',
                render: (text, record) => (record.top ? '是' : '否')
            },
            {
                title: '点赞数',
                dataIndex: 'like',
                key: 'like',
            },
            {
                title: '点击数',
                dataIndex: 'click',
                key: 'click',
            },

            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: (text, record) => {

                    return (
                        <span>
                      {/*<a href="/docManage/editDoc">编辑</a>*/}
                            <Link to={{
                                pathname: '/docManage/editDoc',
                                search: `?_id=${record._id}`,
                            }}>编辑</Link>
                      <Divider type="vertical"/>
                      <a href="#">删除</a>
                      <Divider type="vertical"/>
                            {record.hot ? <a href="#" onClick={this.changeToNotHot.bind(this, text, record)}>取消热门</a> :
                                <a href="#" onClick={this.changeToHot.bind(this, text, record)}>置为热门</a>}
                            <Divider type="vertical"/>
                            {record.top ? <a href="#" onClick={this.changeToNotTop.bind(this, text, record)}>取消置顶</a> :
                                <a href="#" onClick={this.changeToTop.bind(this, text, record)}>置为置顶</a>}
                    </span>
                    )
                },
            },];
        const paginationConfig = {
            position: "top",
            defaultCurrent: 1,
            showQuickJumper: true,
            // pageSizeOptions: 10,
            showSizeChanger: true,
            onShowSizeChange: this.onShowSizeChange.bind(this),
            total: allDocs.total,
            showTotal: (total, range) => (`总共 ${total} 条文档`),
            onChange: this.changePageIndex.bind(this)
        }
        return (
            <div className={styles.standardTable}>
                <BreadcrumbComp category={AppConfig.docManage[1]} item={AppConfig.allDocs[1]}/>
                <Form onSubmit={this.handleSubmit} className={styles.searchForm}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <FormItem
                                {...formItemLayout}
                                label="文档标题"
                                validateStatus={this.isError('title') ? 'error' : ''}
                                help={this.isError('title') || ''}
                            >
                                {form.getFieldDecorator('title', {
                                    rules: [{
                                        max: 64
                                    }],
                                })(
                                    <Input placeholder="文档标题"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...formItemLayout}
                                label="所属分类"

                            >

                                <Col span={8}>
                                    <FormItem
                                        validateStatus={this.isError('firstCate') ? 'error' : ''}
                                        help={this.isError('firstCate') || ''}
                                    >
                                        {form.getFieldDecorator('firstCate', {
                                            rules: [{

                                                message: '必须选择一项'
                                            }],
                                        })(<Select placeholder="请选择">
                                            {
                                                categories.filter((item) => (item.parentId === '0')).map((item, index) => (
                                                    <Option key={index} value={item.id}>{item.name}</Option>
                                                ))
                                            }
                                        </Select>)}
                                    </FormItem>
                                </Col>

                                {
                                    this.getTwoLevelCate(form.getFieldValue('firstCate'))
                                    &&
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
                                                {form.getFieldDecorator('secondCate', {
                                                    rules: [{
                                                        required: true,
                                                        message: '必须选择一项'
                                                    }],
                                                })(
                                                    <Select placeholder="请选择">
                                                        {
                                                            [{
                                                                name: '无',
                                                                slug: "",
                                                                parentId: '0',
                                                                id: '0',
                                                                level: 1
                                                            }].concat(this.getTwoLevelCate(form.getFieldValue('firstCate'))).map((item, index, arr) => {
                                                                return (
                                                                    <Option key={index}
                                                                            value={item.id}>{item.name}</Option>)
                                                            })

                                                        }

                                                    </Select>)}
                                            </FormItem>
                                        </Col>
                                    </div>
                                }
                                {
                                    this.getThreeLevelCate(form.getFieldValue('firstCate'), form.getFieldValue('secondCate'))

                                    &&
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
                                                {form.getFieldDecorator('thirdCate', {
                                                    rules: [{
                                                        required: true,
                                                        message: '必须选择一项'
                                                    }],
                                                })(
                                                    <Select placeholder="请选择">
                                                        {
                                                            [{
                                                                name: '无',
                                                                slug: "",
                                                                parentId: '0',
                                                                id: '0',
                                                                level: 1
                                                            }].concat(this.getThreeLevelCate(form.getFieldValue('firstCate'), form.getFieldValue('secondCate'))).map((item, index) => (
                                                                <Option key={index} value={item.id}>{item.name}</Option>
                                                            ))
                                                        }
                                                    </Select>)}
                                            </FormItem>
                                        </Col>
                                    </div>
                                }


                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...formItemLayout}
                                label="作者"
                                validateStatus={this.isError('authorId') ? 'error' : ''}
                                help={this.isError('authorId') || ''}
                            >
                                {form.getFieldDecorator('authorId', {
                                    rules: [{

                                        validator: this.handleOrder
                                    }],
                                })(
                                    <Input placeholder="文档作者"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...formItemLayout}
                                label="创建时间"
                            >
                                {form.getFieldDecorator('createTime', {
                                    rules: [{type: 'array', message: '请选择日期!'}]
                                })(
                                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...formItemLayout}
                                label="更新时间"
                            >
                                {form.getFieldDecorator('updateTime', {
                                    rules: [{type: 'array', message: '请选择日期!'}]
                                })(
                                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{textAlign: 'right'}}>
                            <Button type="primary" htmlType="submit">搜索</Button>


                        </Col>
                    </Row>

                </Form>

                <Table
                    rowKey={'title'}
                    columns={columns}
                    dataSource={docs}
                    pagination={paginationConfig}
                />
                {/*<Pagination showQuickJumper defaultCurrent={2} total={500} onChange={this.onChange} />,*/}
            </div>
        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AllDocs))
