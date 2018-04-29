import React, {Component} from 'react'

import AppConfig from 'config/app.config'


// const mapStateToProps = state => {
//   return {
//     // globalVal: state.globalVal.toJS(),
//     // auth: state.auth.toJS(),
//     // sns: state.sns.toJS()
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return {
//     actions: bindActionCreators(Actions, dispatch)
//   }
// }


class ModifyPwd extends Component {
  constructor(props) {
    super(props)
  }

  // static propTypes = {
  //   actions: PropTypes.object.isRequired,
  //   globalVal: PropTypes.object.isRequired,
  //   auth: PropTypes.object.isRequired,
  //   sns: PropTypes.object.isRequired,
  //   handleSubmit: PropTypes.func,
  //   dirty: PropTypes.bool,
  //   invalid: PropTypes.bool,
  //   history: PropTypes.object
  // }


  // static fetchData(params) {
  //   return [Actions.getSnsLogins()]
  // }


  render() {
    // const {sns, globalVal: {captchaUrl}, dirty, invalid, handleSubmit} = this.props

    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>{AppConfig.panel[1]}
            <small>{AppConfig.modifyPwd[1]}</small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i>主页</a></li>
            <li><a href="#">{AppConfig.panel[1]}</a></li>
            <li className="active">{AppConfig.modifyPwd[1]}</li>
          </ol>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title"> item </h3>
                </div>

                <form className="form-horizontal" name="myForm">
                  <div className="box-body">
                    <div className="form-group">
                      <label htmlFor="adminUser_password" className="col-sm-2 control-label">新密码</label>

                      <div className="col-sm-10">
                        <input type="password" name="" className="form-control" id="adminUser_password"                               placeholder="请输入新密码" required/>
                        <span className="help-block ng-hide"><span className="glyphicon glyphicon-remove"></span>对不起，密码必须为字母或者下划线_开头，只能包含字母、数字、下划线_，且长度为6~22位！</span>
                        <span className="help-block ng-hide"><span className="glyphicon glyphicon-ok"></span>恭喜您，该密码可用！</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="adminUser_repassword" className="col-sm-2 control-label">确认密码</label>

                      <div className="col-sm-10">
                        <input type="password" name="adminUser_repassword" className="form-control" id="adminUser_repassword" placeholder="请输入确认密码" required/>
                        <span className="help-block ng-hide"><span className="glyphicon glyphicon-remove"></span>对不起，两次输入密码不相同！</span>
                        <span className="help-block ng-hide"><span className="glyphicon glyphicon-ok"></span>恭喜您，两次密码输入一致！</span>
                      </div>
                    </div>
                  </div>

                  <div className="box-footer">
                    <button type="submit" className="btn btn-primary pull-right">提交</button>
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

export default ModifyPwd