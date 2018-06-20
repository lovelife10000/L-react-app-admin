import React, {Component} from 'react'
import {AppConfig} from '../../../../../config/app.config'
import * as Actions from '../../../../../actions'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = state => {
  return {
    allUserGroups: state.allUserGroups.toJS()
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

class AllUserGroups extends Component {
  constructor() {
    super()
  }

  static propTypes = {
    allUserGroups: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static fetchData(){
    console.log('AllUserGroups中fetchData')
    return [Actions.getAllUserGroups()]
  }

  componentDidMount() {

    const {actions, allUserGroups} = this.props
    console.log('AllUserGroups中fetchData')
    if (allUserGroups.length < 2) {
      actions.getAllUserGroups()
    }
  }

  render() {
    const {allUserGroups} = this.props
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {AppConfig.userManage[1]}
            <small> {AppConfig.allUserGroups[1]}</small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i>主页</a></li>
            <li><a href="#"> {AppConfig.userManage[1]} </a></li>
            <li className="active"> {AppConfig.allUserGroups[1]}</li>
          </ol>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-primary">
                <div className="box-header">
                  <h3 className="box-title">{AppConfig.allUserGroups[1]}</h3>
                </div>

                <div className="box-body table-responsive no-padding">
                  <table className="table table-hover  table-bordered table-striped">
                    <tbody>
                      <tr>
                        <th>组名称</th>
                        <th>状态</th>
                        <th>操作</th>
                      </tr>

                      {allUserGroups.map((item, index) =>

                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.user_group_status? '启用' :'禁用'}</td>
                          <td>
                            {item.user_group_status?  <button type="button" className="btn btn-danger btn-xs btn-flat">禁用</button> : <button type="button" className="btn btn-success btn-xs btn-flat ng-hide">启用</button>}


                            <button type="button" className="btn btn-primary btn-xs btn-flat" data-toggle="modal" data-target="#users_group_edit_modal">编辑
                            </button>
                            <button type="button" className="btn btn-warning btn-xs btn-flat" data-toggle="modal" data-target="#users_group_power_modal">权限分配
                            </button>
                          
                          </td>

                        </tr>

                      )}

                    </tbody>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllUserGroups))