import React, {Component} from 'react'
import {AppConfig} from '../../../../config/app.config'
import * as Actions from '../../../../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = (state) => {
  return {
    categories: state.categories.toJS()
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
};

class AllCategories extends Component {
  constructor() {
    super()
  }

  static propTypes={
    categories:PropTypes.array.isRequired,
    actions:PropTypes.object.isRequired
  };

  componentDidMount(){
    const {categories}=this.props
    if(categories.length<1){
      this.props.actions.getCategories()
    }
  }

  render() {
    const {categories} =this.props
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {AppConfig.docManage[1]}
            <small>{AppConfig.allCategories[1]}</small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i>主页</a></li>
            <li><a href="#">{AppConfig.docManage[1]}</a></li>
            <li className="active">{AppConfig.allCategories[1]}</li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">{AppConfig.allCategories[1]}</h3>
                </div>
                <div className="box-body">
                  <table className="table table-hover  table-bordered table-striped">
                    <tbody>
                      <tr>
                        <th style={{width: '10px'}}>序号</th>
                        <th>名称</th>
                        <th>别称</th>
                        <th>父级</th>
                        <th>排序</th>
                        <th>操作</th>
                      </tr>
                      {
                        categories.map((item, index) =>
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td>{item.parent_category_id}</td>
                            <td>{item.sort}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories)