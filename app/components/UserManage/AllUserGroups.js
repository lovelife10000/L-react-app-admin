import React, {Component} from 'react'
import {app} from '../../config/app'

class AllUserGroups extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {app.USERS_MANAGE[1]}
            <small> {app.ALL_USER_GROUPS[1]}</small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i>主页</a></li>
            <li><a href="#"> {app.USERS_MANAGE[1]} </a></li>
            <li className="active"> {app.ALL_USER_GROUPS[1]}</li>
          </ol>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">所有用户组</h3>
                </div>

                <div className="box-body table-responsive no-padding">
                  <table className="table table-hover  table-bordered table-striped">
                    <tr>
                      <th>组ID</th>
                      <th>组名称</th>
                      <th>描述</th>
                      <th>状态</th>
                      <th>操作</th>
                    </tr>

                    <tr>

                      <td>pid</td>
                      <td>name</td>
                      <td>remark</td>
                      <td>status</td>
                      <td>
                        <button type="button" className="btn btn-success btn-xs btn-flat ng-hide">启用</button>
                        <button type="button" className="btn btn-danger btn-xs btn-flat">禁用</button>
                        <button type="button" className="btn btn-primary btn-xs btn-flat" data-toggle="modal" data-target="#users_group_edit_modal">编辑
                        </button>
                        <button type="button" className="btn btn-warning btn-xs btn-flat" data-toggle="modal" data-target="#users_group_power_modal">权限分配
                        </button>
                        <button type="button" className="btn btn-info btn-xs btn-flat">投稿分类</button>
                      </td>

                    </tr>

                  </table>
                </div>

              </div>

            </div>
          </div>
        </section>

      </div>
    )
  }
}

export default AllUserGroups