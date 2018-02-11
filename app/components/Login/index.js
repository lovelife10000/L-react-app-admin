import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import * as Actions from '../../actions'
import {withRouter} from 'react-router-dom'
import {isLogin} from '../../utils/auth.util'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
const FormItem = Form.Item;
import styles from './index.less'

const mapStateToProps = (state)=> {
  return {
    globalVal: state.globalVal.toJS(),
    showMsg: state.showMsg.toJS(),
    auth:state.auth.toJS()
  }
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@Form.create()
class Login extends Component {
  constructor(props) {
    super(props)
    this.submitForm = this.submitForm.bind(this)
    this.changeCaptcha = this.changeCaptcha.bind(this)
  }

  static propTypes = {
    handleSubmit: PropTypes.func,
    actions: PropTypes.object.isRequired,
    globalVal: PropTypes.object.isRequired,
    dirty: PropTypes.bool,
    invalid: PropTypes.bool,
    history: PropTypes.object,
    auth:PropTypes.object.isRequired,
    showMsg: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired
  };
  static fetchData({token}){
    console.log('Login中获取用户信息')
    return [Actions.getUserInfo(token)]
  }
  componentDidMount() {
    const { actions,auth} = this.props
    if(auth.user===null){
      actions.getUserInfo()
    }
  }
  componentWillMount(){
    // const { actions} = this.props
    if(isLogin()) {
      try {
        window.location.href='/'
      }catch (err){
        console.log('忽略服务端渲染,组件检查的时候window is not defined')
      }
    }
  }

  componentWillReceiveProps(nextProps){
    const { globalVal } = this.props
    if(globalVal.styleMode !== nextProps.globalVal.styleMode){
      document.body.className = nextProps.globalVal.styleMode
    }
  }
  submitForm(form) {
    console.log('login中submitForm执行')
    const {actions} = this.props
    console.log('login中submitForm执行', actions.login)
    actions.localLogin(form)

  }

  changeCaptcha(e) {
    e.preventDefault()
    const {actions} = this.props
    actions.getCaptchaUrl()
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.submitForm(values)
      }
    });
  }

  handleUsername = (rule, value, callback) => {
    if (!value) {
      callback('用户名不能为空')
    }
    if (!/^[_a-zA-Z]\w{5,19}$/.test(value)) {
      callback('无效的用户名')
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  }

  handlePassword = (rule, value, callback) => {
    if (!value) {
      callback('密码不能为空')
    }
    if (!/^[_a-zA-Z]\w{5,19}$/.test(value)) {
      callback('无效的密码')
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  }

  handleCaptcha = (rule, value, callback) => {
    if (!value) {
      callback('验证码不能为空')
    }
    if (!/^\w{6}$/.test(value)) {
      callback('无效的验证码')
    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  }


  render() {

    const { globalVal: {captchaUrl},  showMsg}=this.props
    const { getFieldDecorator, isFieldTouched, getFieldError } = this.props.form;

    const nameError = isFieldTouched('username') && getFieldError('username');
    console.log('666',isFieldTouched('username'),getFieldError('username'))
    return (
      <div className={styles.loginCard}>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>

          <FormItem
            validateStatus={nameError ? 'error' : ''}
            hideRequiredMark
            help={nameError || ''}
          >
            {getFieldDecorator('username', {
              rules: [{
                required: true,
                pattern: /^[_a-zA-Z]\w{5,19}$/,
                validator: this.handleUsername
              }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </FormItem>


          <FormItem>
            {getFieldDecorator('password', {
              rules: [{
                required: true, pattern: /^[_a-zA-Z]\w{5,19}$/,
                validator: this.handlePassword
              }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </FormItem>


          <FormItem
          >
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{
                    required: true,
                    validator: this.handleCaptcha,
                    min:6,
                    max:6
                  }],
                })(
                  <Input placeholder="验证码" />
                )}
              </Col>
              <Col span={12}>
                <a href="javascript:;"  onClick={this.changeCaptcha}><img style={{display:'block',    width: '100%',
                  paddingTop: '5px'}} src={captchaUrl} alt=""/></a>
              </Col>
            </Row>
          </FormItem>


          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
              登录
            </Button>
            <a href="">{showMsg.content}</a>
          </FormItem>

        </Form>
      </div>

    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))