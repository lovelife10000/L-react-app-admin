import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import * as Actions from '../../../actions'
import {AppConfig} from '../../../config/app.config'


const mapStateToProps = state => {
  return {
    // globalVal: state.globalVal.toJS(),
    // auth: state.auth.toJS(),
    // sns: state.sns.toJS()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}


class BasicInfo extends Component {
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
            <small>{AppConfig.basicInfo[1]}</small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i>主页</a></li>
            <li><a href="#">{AppConfig.panel[1]}</a></li>
            <li className="active">{AppConfig.basicInfo[1]}</li>
          </ol>
        </section>
        <section className="content">
          <div className="row">

            <div className="col-md-6">

              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">系统通知</h3>
                </div>
                <div className="box-body">
                  <div className="well"><h4>版本信息</h4>
                    当前版本: L-blog&nbsp;v1.0.0 发布时间: 20170505 <a href="">检查更新</a></div>
                  <div className="well">

                    <h4>QQ讨论</h4>
                    群号：1358180015

                    <h4>信息反馈</h4>
                    Email：1358180015@qq.com
                  </div>
                </div>
                <div className="box-footer"></div>
              </div>
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">关于作者</h3>
                </div>
                <div className="box-body">
                  <div className="well">
                    <h4>开发作者</h4>
                    Kevin/web developer
                    <h4>github</h4>
                    <a href="https://github.com/lovelife10000">https://github.com/lovelife10000</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">用户系统信息</h3>
                </div>
                <div className="box-body">
                  <div className="row ">
                    <div className="col-md-3">
                      <img style={{width: '100%'}} src="" alt=""/>
                    </div>
                    <div className="col-md-6  ">

                      <h1></h1>


                      <p>用户名: userInfo.username </p>

                      <p>邮箱: userInfo.email </p>

                      <p>注册时间: userInfo.date </p>


                    </div>

                  </div>

                  <div className="row ">

                    <br/>

                  </div>


                  <div className="row">

                    <div className=" col-xs-6">

                      <div className="small-box bg-green">
                        <div className="inner">
                          <h3>
                            1篇
                          </h3>

                          <p>
                            文章
                          </p>
                        </div>
                        <div className="icon">
                          <span className="glyphicon glyphicon-stats"></span>
                        </div>
                        <a href="/a/index.php?m=admin&amp;c=posts&amp;a=index" className="small-box-footer">
                          所有文章 <i className="fa fa-arrow-circle-right"></i>
                        </a>
                      </div>
                    </div>

                    <div className=" col-xs-6">
                      <div className="small-box bg-yellow">
                        <div className="inner">
                          <h3>
                            1名
                          </h3>

                          <p>
                            注册用户
                          </p>
                        </div>
                        <div className="icon">
                          <span className="glyphicon glyphicon-user"></span>
                        </div>
                        <a href="/a/index.php?m=admin&amp;c=access&amp;a=index" className="small-box-footer">
                          用户管理 <i className="fa fa-arrow-circle-right"></i>
                        </a>
                      </div>
                    </div>

                  </div>


                </div>

                <div className="box-footer">

                </div>

              </div>
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">其他信息</h3>
                </div>

                <div className="box-body">
                  <div className="well">
                    <h4>提示</h4>
                    未完全开发完
                  </div>
                  <div className="well">
                    <h4>获取最新源码</h4>
                    Github:<a href="https://github.com/lovelife10000/L-blog">https://github.com/lovelife10000/L-blog</a>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </section>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BasicInfo))