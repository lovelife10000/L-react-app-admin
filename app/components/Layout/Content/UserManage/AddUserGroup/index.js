import React, {Component} from 'react'
import AppConfig from 'config/app.config'
import * as Actions from 'actions'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Button, Card, Form, Input, Radio, Select,} from 'antd';
import BreadcrumbComp from 'components/Common/BreadcrumbComp'
import ModalSuccessComp from 'components/Common/ModalComp/ModalSuccessComp'

const {Option} = Select;
const FormItem = Form.Item;


const mapStateToProps = state => {
    return {
        allUserGroups: state.allUserGroups.toJS(),
        showModal: state.showModal.toJS(),
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
        allUserGroups: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        dirty: PropTypes.bool,
        invalid: PropTypes.bool,
        handleSubmit: PropTypes.func,
        form: PropTypes.object.isRequired,
    };


    componentDidMount() {

        const {actions, allUserGroups} = this.props

        if (allUserGroups.data.length < 2) {

            actions.getAllUserGroups()
        }
    }

    addUserGroup(data) {
        const {actions} = this.props
        actions.addUserGroup(data)
    }


    handleGroup = (rule, value, callback) => {
        if (!value) {
            callback('必须选择一项')
        }


        // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
        callback()
    }
    handleSubmit = (e) => {


        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                this.props.actions.addUserGroup(values)
            }
        });
    }

    resetHelp(field) {
        const {actions, allUserGroups} = this.props
        actions.resetHelp(field)
        if (field === 'Name') {
            return allUserGroups.msgForName
        } else {
            return allUserGroups.msgForSlug
        }

    }

    isError(name) {

        return this.props.form.isFieldTouched(name) && this.props.form.getFieldError(name);
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
        const {allUserGroups, showModal} = this.props;


        const {getFieldDecorator, isFieldTouched, getFieldError} = this.props.form;

        return (
            <Card bordered={false}>
                <BreadcrumbComp category={AppConfig.userManage[1]} item={AppConfig.addUserGroup[1]}/>

                {
                    showModal.visible &&
                    <ModalSuccessComp data={{showModal}}/>
                }
                <Form
                    onSubmit={this.handleSubmit}
                    hideRequiredMark
                    style={{marginTop: 8}}
                >
                    <FormItem
                        {...formItemLayout}
                        label="组名称"
                        hasFeedback={isFieldTouched('name') ? true : false}
                        validateStatus={this.isError('name') ? 'error' : 'success'}
                        help={allUserGroups.msgForName || this.isError('name') || ''}
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true,
                                pattern: /^[\w\u4e00-\u9fa5]{1,20}$/,
                                message: '中文或者字母，1-20位'
                            }],
                        })(
                            <Input placeholder="组名称" onChange={this.resetHelp.bind(this, 'Name')}/>
                        )}


                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="组别名"
                        hasFeedback={isFieldTouched('slug') ? true : false}
                        validateStatus={this.isError('slug') ? 'error' : 'success'}
                        help={allUserGroups.msgForSlug || this.isError('slug') || ''}
                    >
                        {getFieldDecorator('slug', {
                            rules: [{
                                required: true,
                                pattern: /^[a-zA-Z]\w{1,10}$/,
                                message: '只支持字母，1到10位'
                            }],
                        })(
                            <Input placeholder="组别名" onChange={this.resetHelp.bind(this, 'Slug')}/>
                        )}


                    </FormItem>
                    <Form.Item
                        {...formItemLayout}
                        label="父级组"
                        help={ this.isError('parentId') || ''}
                    >

                        {getFieldDecorator('parentId', {
                            rules: [{
                                required: true,
                                validator: this.handleGroup
                            }],
                        })(
                            <Select placeholder="请选择">
                                {
                                    [{
                                        _id: '0',
                                        name: '无',
                                        slug: '',
                                        parentId: '0',
                                        status: true
                                    }].concat(allUserGroups.data).map((item, index) => (
                                        <Option key={index} value={item._id}>{item.name}</Option>
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
                                initialValue: true,
                            })(
                                <Radio.Group>
                                    <Radio value={true}>启用</Radio>
                                    <Radio value={false}>禁用</Radio>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddUserGroup)))