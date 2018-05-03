import React, {Component, PureComponent} from 'react'
import AppConfig from 'config/app.config'
import * as Actions from 'actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import styles from './index.less';
import BreadcrumbComp from 'components/Common/BreadcrumbComp'
import {Modal, Form, Input, Button, Table, Col, Selectl,Divider,Popconfirm} from 'antd'
import ModalSuccessComp from 'components/Common/ModalComp/ModalSuccessComp'

const FormItem = Form.Item;


const mapStateToProps = (state) => {
    return {
        categories: state.categories.toJS(),
        showModal: state.showModal.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
};

function hasErrors(fieldsError) {

    debugger
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AllCategories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            onEditingData: {parentId: '0',},
            twoLevelArr: [],
            dirty: false,


        }
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



    showEditModal = (text, record, index) => {


        const {form, categories} = this.props
        debugger
        this.setState({
            visible: true,
            onEditingData: text,

        }, function () {
            switch (text.level) {
                case 1:
                    form.setFieldsValue({
                        name: text.name,
                        slug: text.slug,
                        order: text.order,
                        id: text.id,


                    });
                    break;
                case 2:
                    form.setFieldsValue({
                        name: text.name,
                        slug: text.slug,
                        order: text.order,
                        id: text.id,
                        parentId: text.parentId,

                    });
                    break;
                case 3:

                    this.setState({
                        twoLevelArr: this.getTwoLevelCate(this.getOneLevelCate(text.parentId))
                    }, function () {
                        form.setFieldsValue({
                            name: text.name,
                            slug: text.slug,
                            order: text.order,
                            id: text.id,
                            parentIdFirst: this.getOneLevelCate(text.parentId),
                            parentIdSecond: text.parentId
                        });
                    });

                    break
            }


        });


    }

    //由三级分类反推一级分类id
    getOneLevelCate(str) {

        const {categories} = this.props

        for (let x of categories) {
            if (x.children) {

                for (let i of x.children) {

                    if (i.id === str) {

                        return i.parentId
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


    handleParentIdFirst(value) {
        debugger
        const {form, categories} = this.props
        const aa = this.getTwoLevelCate(value)
        debugger
        if (aa) {
            debugger
            this.setState({
                twoLevelArr: aa
            }, function () {
                form.setFieldsValue({

                    parentIdFirst: value,
                });
                this.props.form.validateFields();

            });

        } else {
            debugger

            this.setState({
                twoLevelArr: []
            });
        }

    }

    toDirty() {
        this.setState({
            dirty: true
        })
    }


    handleSubmit(e) {
e.preventDefault()
        const {form} = this.props
        const {onEditingData} = this.state
        const that = this;
        form.validateFields((err, values) => {
            console.log(that.state);
            debugger
            if (!err) {

                let parentId = values.parentIdSecond || values.parentIdFirst;

                const data = Object.assign({}, {name: values.name, slug: values.slug, order: values.order}, {
                    parentId,
                    id: onEditingData.id
                })
                debugger
                this.props.actions.editCategory(data)

            }
        });
    }


    handleOrder = (rule, value, callback) => {
        const value2 = Number(value);


        if (!/^([1-9]\d{0,2}|1000)$/.test(value2)) {
            callback('不是1-1000的正整数')
        }
        callback();
    }


    removeCateConfirm(id){
        const{actions}=this.props
        actions.removeCategory({id})
    }

    removeCateCancel(){

    }

    closeModal() {
        this.setState({
            visible: false,
        });
    }

    render() {
        const {categories, showModal} = this.props
        const {onEditingData, twoLevelArr, dirty} = this.state
        console.log(this.state);
        debugger
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',

            }, {
                title: '别名',
                dataIndex: 'slug',

            },
            {
                title: '排序值',
                dataIndex: 'order',

            },
            {
                title: '操作',
                dataIndex: '',
                key: 'operation',
                render: (text, record, index) => {

                    console.log(text, 666, record,index);

                    return (
                        <span>
                             <a href="javascript:void(0)" onClick={this.showEditModal.bind(this, text, record, index)}>编辑</a>
                            {!text.children &&<Divider type="vertical" />}
                            {!text.children &&


                            <Popconfirm placement="right" title={'是否要删除“'+text.name+'”分类'} onConfirm={this.removeCateConfirm.bind(this,text.id)} onCancel={this.removeCateCancel} okText="确定" cancelText="取消">

                                <a href="javascript:void(0)">删除</a>
                                </Popconfirm>

                            }

                </span>

                    )
                },
            },];
        const {getFieldDecorator, getFieldsError} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 12},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const submitFormLayout = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 10, offset: 7},
            },
        };

        return (

            <div className={styles.standardTable}>
                <BreadcrumbComp category={AppConfig.docManage[1]} item={AppConfig.allCategories[1]}/>

                {
                    showModal.visible &&
                    <ModalSuccessComp data={{showModal}}/>
                }



                <Modal
                    title="编辑分类"
                    visible={this.state.visible}
                    footer={null}
                    mask={false}
                >
                    <Form onSubmit={this.handleSubmit.bind(this)}>


                        <FormItem
                            {...formItemLayout}
                            label="分类名称"
                        >
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '不符合规则',
                                        max: 32
                                    }
                                ],
                            })(
                                <Input placeholder="分类名称" onChange={this.toDirty.bind(this)}/>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="别名"
                        >
                            {getFieldDecorator('slug', {
                                rules: [
                                    {
                                        required: true,
                                        message: '不符合规则',
                                        pattern: /^[a-zA-Z]\w{1,10}$/
                                    }
                                ],
                            })(
                                <Input placeholder="别名" onChange={this.toDirty.bind(this)}/>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="排序值"
                        >
                            {getFieldDecorator('order', {
                                rules: [
                                    {
                                        required: true,
                                        validator: this.handleOrder
                                    }
                                ],
                            })(
                                <Input placeholder="排序值" onChange={this.toDirty.bind(this)}/>
                            )}
                        </FormItem>


                        {

                            onEditingData.level === 2
                            &&
                            <FormItem
                                {...formItemLayout}
                                label="父级分类"
                                required
                            >

                                <Col span={8}>
                                    <FormItem

                                    >
                                        {getFieldDecorator('parentIdFirst', {
                                            rules: [{
                                                required: true,
                                                message: '必须选择一项'
                                            }],
                                        })(<Select placeholder="请选择">
                                            {
                                                categories.filter((item) => item.parentId === '0').map((item, index) => (
                                                    <Option key={index} value={item.id}>{item.name}</Option>
                                                ))
                                            }
                                        </Select>)}
                                    </FormItem>
                                </Col>


                            </FormItem>
                        }
                        {
                            onEditingData.level === 3
                            &&


                            <FormItem
                                {...formItemLayout}
                                label="父级分类"
                                required
                            >

                                <Col span={8}>
                                    <FormItem

                                    >
                                        {getFieldDecorator('parentIdFirst', {
                                            rules: [{
                                                required: true,
                                                message: '必须选择一项'
                                            }],
                                        })(<Select placeholder="请选择" onChange={this.handleParentIdFirst.bind(this)}>
                                            {
                                                categories.filter((item) => item.parentId === '0').map((item, index) => (
                                                    <Option key={index} value={item.id}>{item.name}</Option>
                                                ))
                                            }
                                        </Select>)}
                                    </FormItem>
                                </Col>


                                {
                                    onEditingData.level === 3 && twoLevelArr.length > 0
                                    &&
                                    <div>

                                        <Col span={1}>
                                        <span style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>-
                                        </span>
                                        </Col>
                                        <Col span={8}>
                                            <FormItem

                                            >
                                                {getFieldDecorator('parentIdSecond', {
                                                    rules: [{
                                                        required: true,
                                                        message: '必须选择一项'
                                                    }],
                                                })(<Select placeholder="请选择">
                                                    {
                                                        twoLevelArr.map((item, index) => (
                                                            <Option key={index} value={item.id}>{item.name}</Option>
                                                        ))
                                                    }
                                                </Select>)}
                                            </FormItem>
                                        </Col>
                                    </div>}


                            </FormItem>


                        }


                        <FormItem {...submitFormLayout} style={{marginTop: 32}}>
                            <Button disabled={!dirty || hasErrors(getFieldsError())} type="primary"
                                    htmlType="submit" >
                                确定
                            </Button>
                            <Button type="default" onClick={this.closeModal.bind(this)} style={{marginLeft: 8}}>
                                关闭
                            </Button>
                        </FormItem>

                    </Form>

                </Modal>
                <Table

                    columns={columns}

                    dataSource={categories}
                />


            </div>


        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AllCategories))