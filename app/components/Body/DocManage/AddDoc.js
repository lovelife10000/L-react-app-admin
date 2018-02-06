import React, {Component} from 'react'
import {AppConfig} from '../../../config/app.config'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../actions'
import {bindActionCreators} from 'redux'
import {Editor, EditorState} from 'draft-js'
import ColorfulEditorExampleTwitter from '../../UI/Editor/ColorfulEditorExampleTwitter'


const validate = values => {
  const errors = {}

  if (!values.username) {
    errors.username = '用户名未填写'
  } else if (!/^[a-zA-Z]\w{5,19}$/.test(values.username)) {
    errors.username = '无效的用户名'
  }


  if (!values.nickname) {
    errors.nickname = '昵称未填写'
  }else if (!/^[_a-zA-Z\u4e00-\u9fa5][\w\u4e00-\u9fa5_]{5,19}$/.test(values.nickname)) {
    errors.nickname = '无效的昵称'
  }


  if (!values.password) {
    errors.password = '密码未填写'
  }else if (!/^[_a-zA-Z]\w{5,21}$/.test(values.password)) {
    errors.password = '无效的密码'
  }


  if (!values.rePassword) {
    errors.rePassword = '确认密码未填写'
  } else if (values.rePassword!==values.password) {
    errors.rePassword = '两次密码输入不一致'
  }


  if (!values.userGroup) {
    errors.userGroup = '必须选择一项'
  }


  if (!values.status) {
    errors.status = '必须选择一项'
  }


  if (!values.phone) {
    errors.phone = '电话未填写'
  }else if (!/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/.test(values.phone)) {
    errors.phone = '无效的电话'
  }


  if (!values.email) {
    errors.email = '邮箱未填写'
  }else if (!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(values.email)) {
    errors.email = '无效的邮箱'
  }


  // if (values.remark.length>100) {
  //   errors.remark = '备注超出长度限制'
  // }

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
  <div className={'form-group ' + (field.meta.touched && (field.meta.error && ' has-error'))}>
    <label htmlFor={field.name} className="col-sm-2 control-label">{field.placeholder}</label>
    <div className="col-sm-8">
      <input className={validatorCalss(field.meta)} name={field.name} maxLength={field.maxLength} {...field.input} placeholder={field.placeholder} type={field.type}/>
      {field.meta.touched && (field.meta.error && <span className="help-block">{field.meta.error}</span>)}
    </div>
  </div>
)
const renderFieldForSelect = field => (
  <div className={'form-group ' + (field.meta.touched && (field.meta.error && ' has-error'))}>
    <label className="col-sm-2 control-label">{field.placeholder}</label>
    <div className="col-sm-8">
      <select className={validatorCalss(field.meta)} name={field.name} maxLength={field.maxLength} {...field.input} placeholder={field.placeholder} type={field.type}>
        <option value="">-- 请选择 --</option>
        <option value="666">666</option>
      </select>
      {field.meta.touched && (field.meta.error && <span className="help-block">{field.meta.error}</span>)}

    </div>
  </div>
)

const renderFieldForTextarea = field => (
  <div className={'form-group ' + (field.meta.touched && (field.meta.error && ' has-error'))}>
    <label className="col-sm-2 control-label">{field.placeholder}</label>
    <div className="col-sm-8">
      <textarea className={validatorCalss(field.meta)} rows="3" placeholder={field.placeholder} {...field.input} name={field.name} type={field.type}></textarea>
      {field.meta.touched && (field.meta.error && <span className="help-block">{field.meta.error}</span>)}
    </div>
  </div>
)


const mapStateToProps = state => {
  return {

  }
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
};


class AddDoc extends Component {

  constructor(props) {
    super(props)
    this.addUser=this.addUser.bind(this)
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  static propTypes = {
    dirty: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    actions: PropTypes.object.isRequired,
  };

  addUser(payload){
    console.log('payload',payload)
    this.props.actions.addUser(payload)
  }

  render() {

    const {dirty, invalid,handleSubmit} = this.props;
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {AppConfig.docManage[1]}
            <small>{AppConfig.addDoc[1]}</small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i>主页</a></li>
            <li><a href="#">{AppConfig.docManage[1]}</a></li>
            <li className="active">{AppConfig.addDoc[1]}</li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">{AppConfig.addDoc[1]}</h3>
                </div>
                <form className="form-horizontal" onSubmit={handleSubmit(this.addUser)}>
                  <div className="box-body">
                    <Field name="username" component={renderField} type="text" placeholder="用户名"/>
                    <Field name="nickname" component={renderField} type="text" placeholder="昵称"/>
                    <Field name="password" component={renderField} type="password" placeholder="密码"/>
                    <Field name="rePassword" component={renderField} type="password" placeholder="确认密码"/>
                    <Field className="form-control" name="userGroup" component={renderFieldForSelect} type="text" placeholder="用户组"/>
                    <Field name="status" className="form-control" component={renderFieldForSelect} type="text" placeholder="状态"/>
                    <Field name="phone" component={renderField} type="text" placeholder="电话"/>
                    <Field name="email" component={renderField} type="email" placeholder="邮箱"/>
                    <Field name="remark" className="form-control" component={renderFieldForTextarea} type="text" placeholder="备注"/>
                    <Editor
                      editorState={this.state.editorState}
                      onChange={this.onChange}
                      placeholder="Write something colorful..."
                    />
                    <ColorfulEditorExampleTwitter/>
                    <div className="box-footer">
                      <button disabled={dirty && invalid} type="submit" className="btn btn-primary pull-right">添加</button>
                      {/*<input disabled={dirty && invalid} type="submit" className="btn btn-primary pull-right" value="添加"/>*/}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
  form:'addUser',
  validate
})(AddDoc))