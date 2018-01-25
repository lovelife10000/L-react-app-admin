import React, {Component} from 'react'
import {Field,reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import * as Actions from '../../actions'
import { withRouter } from 'react-router-dom'
// import {isLogin} from '../../utils/auth.util'

const mapStateToProps=(state)=>{
  return{
    globalVal : state.globalVal.toJS(),
    showMsg:state.showMsg.toJS()
  }
};
const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = '用户名不能为空'
  } else if (!/^[_a-zA-Z]\w{5,19}$/.test(values.username)) {
    errors.username = '用户名格式不正确'
  }

  if (!values.password) {
    errors.password = '密码不能为空'
  } else if (values.password.length < 8) {
    errors.password = '密码长度不足'
  }

  if (!values.captcha) {
    errors.captcha = '验证码不能为空'
  } else if (values.captcha.length !== 6 ) {
    errors.captcha = '验证码位数不正确'
  }
  return errors
}
const validatorCalss = field => {
  let initClass = 'form-control'
  if (field.invalid) {
    initClass += ' ng-invalid'
  }
  if (field.dirty) {
    initClass += ' ng-dirty'
  }
  return initClass
}
const renderField = field => (
  <div className={'form-group has-feedback '+(field.meta.touched &&(field.meta.error &&' has-error'))}>
    <input name={field.name} className={validatorCalss(field.meta)}  type={field.type} placeholder={field.placeholder} maxLength={field.maxLength}  {...field.input}/>
    <span className={'glyphicon form-control-feedback '+field.glyphicon }></span>
    {field.meta.touched && (field.meta.error && <span className="help-block">{field.meta.error}</span>)}
  </div>
)
// @withRouter
// @connect(mapStateToProps,mapDispatchToProps)
@reduxForm({
  form: 'login',
  validate
})
class Login extends Component {
  constructor(props) {
    super(props)
    this.submitForm=this.submitForm.bind(this)
    this.changeCaptcha = this.changeCaptcha.bind(this)
  }
  static propTypes={
    handleSubmit:PropTypes.func,
    actions: PropTypes.object.isRequired,
    globalVal: PropTypes.object.isRequired,
    dirty: PropTypes.bool,
    invalid: PropTypes.bool,
    history: PropTypes.object,
    showMsg:PropTypes.object.isRequired
  };
  // componentWillMount(){
  //   if(isLogin()) {
  //     this.props.history.push('/')
  //   }
  // }
  submitForm (form) {
    console.log('login中submitForm执行')
    const { actions } = this.props
    console.log('login中submitForm执行',actions.login)
    actions.localLogin(form)

  }
  changeCaptcha(e){
    e.preventDefault()
    const { actions } = this.props
    actions.getCaptchaUrl()
  }

  render() {
    const {handleSubmit,globalVal: {captchaUrl},dirty,invalid,showMsg}=this.props
    return (
      <div className="login-box">
        <div className="login-logo">
          <a href=""><b>L-react-app-admin</b></a>
        </div>

        <div className="login-box-body">
          <p className="login-box-msg">登录</p>

          <form onSubmit={handleSubmit(this.submitForm)} noValidate>
            <Field name="username" component={renderField} type="text" placeholder="用户名" maxLength="20" glyphicon="glyphicon-user"/>
            <Field name="password" component={renderField} type="password" placeholder="密码" glyphicon="glyphicon-lock"/>
            <Field name="captcha" component={renderField} type="text"  placeholder="验证码" maxLength="6" glyphicon="glyphicon-envelope"/>
            <div className="row">
              <div className="col-xs-8">
                <a href="javascript:;" onClick={this.changeCaptcha}>
                  <img style={{width:'100%'}} src={captchaUrl} />
                </a>
              </div>
              <div className="col-xs-4" style={{color: 'red'}}>{showMsg.content}</div>
            </div>
            <div className="row">
              <div className="col-xs-8">
                <div className="checkbox icheck">
                  <label>
                    <input type="checkbox"/> 记住我
                  </label>
                </div>
              </div>

              <div className="col-xs-4">
                <button type="submit" disabled={ dirty && invalid } className="btn btn-primary btn-block btn-flat">登录</button>
              </div>

            </div>
          </form>


        </div>

      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login))