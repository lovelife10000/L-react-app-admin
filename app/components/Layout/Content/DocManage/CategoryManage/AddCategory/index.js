import React, {Component} from 'react'
import AppConfig from 'config/app.config'
import * as Actions from 'actions'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Card, Form, Input,} from 'antd';
import BreadcrumbComp from 'components/Common/BreadcrumbComp'
import Category from 'components/Common/Category'
import ModalSuccessComp from 'components/Common/ModalComp/ModalSuccessComp'


const FormItem = Form.Item;

const mapStateToProps = state => {
    return {
        categories: state.categories.toJS(),
        showModal: state.showModal.toJS(),
    }
};
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
};

function hasErrors(fieldsError) {

    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddCategory extends Component {
    constructor(props) {
        super(props)
        this.addCategory = this.addCategory.bind(this)
        this.state = {
            disabled: true
        }
    }


    static propTypes = {
        categories: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired,
        dirty: PropTypes.bool,
        invalid: PropTypes.bool,
        handleSubmit: PropTypes.func,
    };

    componentWillMount() {

        // console.log('add')
        //   debugger
    }

    componentDidMount() {
        console.log('add')
        // debugger
        this.props.form.validateFields();
        const {actions, categories} = this.props
        if (categories.length < 2) {

            actions.getCategories()
        }
    }


    addCategory(data) {
        const {actions} = this.props
        actions.addCategory(data)
    }

    handleSelectChange = (value) => {
        this.props.form.resetFields('secondCate')
    }


    isError(name) {

        return this.props.form.isFieldTouched(name) && this.props.form.getFieldError(name);
    }

    // success = (msg) => {
    //     message.success(msg);
    // };


    handleOrder = (rule, value, callback) => {
        const value2 = Number(value);


        if (!/^([1-9]\d{0,2}|1000)$/.test(value2)) {
            callback('不是1-1000的正整数')
        }
        callback();
    }
    handleSubmit = (e) => {

        const that = this;

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const my = that;

            if (!err) {
// debugger
                let parentId = values.secondCate || values.firstCate;
                let level = parentId === '0' ? 1 : (values.secondCate ? 3 : 2)
                const data = Object.assign({}, {name: values.name, slug: values.slug, order: values.order}, {
                    parentId,
                    level
                })
                debugger
                this.props.actions.addCategory(data)
            }
        });
    }


    handleCancel = (e) => {
        const {actions} = this.props;
        actions.hideModal()
    }

    render() {
        // console.log('add')
        // debugger
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
        const contentLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 10},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 24},
            },
        };
        const submitFormLayout = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 10, offset: 7},
            },
        };
        const {categories, showModal} = this.props;


        const {getFieldDecorator, getFieldValue, getFieldsError} = this.props.form;

        return (
            <Card bordered={false}>
                <BreadcrumbComp category={AppConfig.docManage[1]} item={AppConfig.addDoc[1]}/>
                {/*<ModalComp data={{title:'提示',onCancel:this.handleCancel}}/>*/}
                {
                    showModal.visible &&
                    <ModalSuccessComp data={{showModal}}/>
                }

                <Form
                    onSubmit={this.handleSubmit}
                    style={{marginTop: 8}}
                >
                    <FormItem
                        {...formItemLayout}
                        label="分类名称"
                        validateStatus={this.isError('title') ? 'error' : ''}
                        help={this.isError('title') || ''}
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true,
                                message: '不符合规则',
                                max: 32
                            }],
                        })(
                            <Input placeholder="请输入分类名称"/>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="分类别名"
                        validateStatus={this.isError('slug') ? 'error' : ''}
                        help={this.isError('slug') || ''}
                    >
                        {getFieldDecorator('slug', {
                            rules: [{
                                required: true,
                                message: '不符合规则',
                                pattern: /^[a-zA-Z]\w{1,10}$/
                            }],
                        })(
                            <Input placeholder="请输入分类别名"/>
                        )}
                    </FormItem>


                    <Category data={{cate: categories, form: this.props.form, must: true}}/>


                    <FormItem
                        {...formItemLayout}
                        label="排序值"
                        validateStatus={this.isError('from') ? 'error' : ''}
                        help={this.isError('order') || ''}
                    >
                        {getFieldDecorator('order', {
                            rules: [{
                                required: true,
                                validator: this.handleOrder
                            }],
                        })(
                            <Input placeholder="1-1000的正整数"/>
                        )}
                    </FormItem>


                    <FormItem {...submitFormLayout} style={{marginTop: 32}}>
                        <Button disabled={hasErrors(getFieldsError())} type="primary" htmlType="submit">
                            添加
                        </Button>

                    </FormItem>

                </Form>
            </Card>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddCategory))