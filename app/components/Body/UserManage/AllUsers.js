import React, {Component} from 'react'
import {AppConfig} from '../../../config/app.config'
import * as Actions from '../../../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps=(state)=>{
  return{
    allUsers:state.allUsers.toJS()
  }
};

const mapDispatchToProps=(dispatch)=>{
  return{
    actions:bindActionCreators(Actions,dispatch)
  }
};

class AllUsers extends Component {
  constructor() {
    super()
  }
  static propTypes={
    allUsers:PropTypes.array,
    actions:PropTypes.object.isRequired,
  };
  static fetchData(){
    return [Actions.getAllUsers()]
  }

  componentDidMount() {
    const {actions, allUsers} = this.props
    if (allUsers.length < 1) {
      actions.getAllUsers()
    }
  }

  render() {
    const {allUsers}=this.props
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {AppConfig.userManage[1]}
            <small>{AppConfig.allUsers[1]}</small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i>主页</a></li>
            <li><a href="#">{AppConfig.userManage[1]}</a></li>
            <li className="active">{AppConfig.allUsers[1]}</li>
          </ol>
        </section>


        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header with-border">
                  <h3 className="box-title">{AppConfig.allUsers[1]}</h3>
                </div>
                <div className="box-body">
                  <table className="table table-hover  table-bordered table-striped">
                    <tbody>
                      <tr>
                        <th style={{width:'10px'}}>序号</th>
                        <th>用户名</th>
                        <th>昵称</th>
                        <th>状态</th>
                        <th>用户组</th>
                        <th>文章数量</th>
                        <th>注册时间</th>
                        <th>操作</th>
                      </tr>
                      {
                        allUsers.map((item,index)=>
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.username}</td>
                            <td>{item.nickname}</td>
                            <td>{item.status}</td>
                            <td>{item.group}</td>
                            <td>999</td>
                            <td>{item.register_time}</td>
                            <td>
                              <button type="button" className="btn btn-primary btn-xs btn-flat">修改用户</button>
                              <button type="button" className="btn btn-danger btn-xs btn-flat">删除</button>
                            </td>
                          </tr>
                        )
                      }

                    </tbody>
                  </table>
                </div>
                <div className="box-footer clearfix">
                  <ul className="pagination pagination-sm no-margin pull-right">
                    <li><a href="#">&laquo;</a></li>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">&raquo;</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    )

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllUsers)
