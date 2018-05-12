import React, {Component} from 'react'
import AppConfig from 'config/app'
import * as Actions from 'actions'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Card, Form, Input, Radio, Select,} from 'antd';
import BreadcrumbComp from 'components/Common/BreadcrumbComp'
import styles from './style.less';

const {Option} = Select;
const FormItem = Form.Item;
const {TextArea} = Input;


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


class AddUser extends Component {

    constructor(props) {
        super(props)
        this.addUser = this.addUser.bind(this)
    }

    static propTypes = {
        handleSubmit: PropTypes.func,
        actions: PropTypes.object.isRequired,
        allUserGroups: PropTypes.object.isRequired,
        form: PropTypes.object.isRequired,
    };

    componentDidMount() {

        const {actions, allUserGroups} = this.props
        if (allUserGroups.data.length < 2) {
            actions.getAllUserGroups()
        }
    }

    isError(name) {

        return this.props.form.isFieldTouched(name) && this.props.form.getFieldError(name);
    }

    addUser(payload) {
        console.log('payload', payload)
        this.props.actions.addUser(payload)
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
        const {allUserGroups} = this.props;


        const {getFieldDecorator, isFieldTouched, getFieldError} = this.props.form;

        return (
            <Card bordered={false}>
                <BreadcrumbComp category={AppConfig.userManage[1]} item={AppConfig.addUser[1]}/>
                <Form
                    onSubmit={this.handleSubmit}

                    style={{marginTop: 8}}
                >
                    <FormItem
                        {...formItemLayout}
                        label="用户名"
                        hasFeedback={isFieldTouched('username') ? true : false}
                        validateStatus={this.isError('username') ? 'error' : 'success'}
                        help={this.isError('username') || ''}
                    >
                        {getFieldDecorator('username', {
                            rules: [{
                                required: true,
                                pattern: /^[\w][\w\d]{3,11}$/,
                                message: '4到12位，必须以字母开头'
                            }],
                        })(
                            <Input placeholder="用户名"/>
                        )}
                    </FormItem>


                    <Form.Item
                        {...formItemLayout}
                        label="用户组"
                        hasFeedback={isFieldTouched('userGroup') ? true : false}
                        validateStatus={this.isError('userGroup') ? 'error' : 'success'}
                        help={this.isError('userGroup') || ''}
                    >

                        {getFieldDecorator('userGroup', {
                            rules: [{
                                required: true,
                                validator: this.handleGroup
                            }],
                        })(
                            <Select placeholder="请选择">
                                {
                                    [{
                                        _id: '1',
                                        name: '无',
                                        power: [],
                                        userGroup: '',
                                        status: true
                                    }].concat(allUserGroups.data).map((item, index) => (
                                        <Option key={index}
                                                value={item._id}>{(item.parent_user_group_id ? '\u00A0\u00A0\u00A0\u00A0' : '') + item.name}</Option>
                                    ))
                                }

                            </Select>)}
                    </Form.Item>


                    <FormItem
                        {...formItemLayout}
                        label="昵称"
                        hasFeedback={isFieldTouched('nickname') ? true : false}
                        validateStatus={this.isError('nickname') ? 'error' : 'success'}
                        help={this.isError('nickname') || ''}
                    >
                        {getFieldDecorator('nickname', {
                            rules: [{
                                required: true, pattern: /^[\u4e00-\u9fa5]{3,10}$/,
                                validator: this.handleName
                            }],
                        })(
                            <Input placeholder="昵称"/>
                        )}
                    </FormItem>


                    <FormItem
                        {...formItemLayout}
                        label="密码"
                        hasFeedback={isFieldTouched('password') ? true : false}
                        validateStatus={this.isError('password') ? 'error' : 'success'}
                        help={this.isError('nickname') || ''}
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, pattern: /^[\u4e00-\u9fa5]{3,10}$/,
                                validator: this.handleName
                            }],
                        })(
                            <Input placeholder="密码"/>
                        )}
                    </FormItem>


                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                        validateStatus={this.isError('rePassword') ? 'error' : 'success'}
                        help={this.isError('rePassword') || ''}
                    >
                        {getFieldDecorator('rePassword', {
                            rules: [{
                                required: true,
                                pattern: /^[\u4e00-\u9fa5]{3,10}$/,

                            }],
                        })(
                            <Input placeholder="确认密码"/>
                        )}
                    </FormItem>


                    <Form.Item
                        {...formItemLayout}
                        label="电话"
                    >


                        {getFieldDecorator('phone', {
                            rules: [{
                                pattern: /^[\u4e00-\u9fa5]{3,10}$/,

                            }],
                        })(
                            <Input placeholder="电话"/>
                        )}
                    </Form.Item>


                    <Form.Item
                        {...formItemLayout}
                        label="邮箱"
                    >

                        {getFieldDecorator('email', {
                            rules: [{
                                pattern: /^[\u4e00-\u9fa5]{3,10}$/,
                                validator: this.handleName
                            }],
                        })(
                            <Input placeholder="邮箱"/>
                        )}
                    </Form.Item>


                    <Form.Item
                        {...formItemLayout}
                        label="备注"
                    >

                        {getFieldDecorator('remark', {
                            rules: [{
                                message: '超过100字符',
                                max: 100
                            }],
                        })(
                            <TextArea style={{minHeight: 32}} placeholder="请输入备注" rows={4}/>
                        )}
                    </Form.Item>


                    <FormItem
                        {...formItemLayout}
                        label="状态"
                        help=""
                    >
                        <div>
                            {getFieldDecorator('status', {
                                initialValue: '1',
                            })(
                                <Radio.Group>
                                    <Radio value="1">启用</Radio>
                                    <Radio value="2">禁用</Radio>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddUser))