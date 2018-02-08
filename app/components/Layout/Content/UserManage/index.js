import React, {Component} from 'react'
import {AppConfig} from '../../../../config/app.config'
import * as Actions from '../../../../actions'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {withRouter} from 'react-router-dom'

const mapStateToProps = state=> {
  console.log('是', state.parentUserGroups.toJS())
  return {
    parentUserGroups: state.parentUserGroups.toJS()
  }
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
};
const validate = values => {
  const errors = {}
  if (!values.groupId) {
    errors.groupId = '组名称未填写'
  } else if (!/^[\u4e00-\u9fa5]{3,10}$/.test(values.groupId)) {
    errors.groupId = '无效的组名称'
  }

  if (!values.parentUserGroups) {
    errors.parentUserGroups = '必须选择一项'
  }
  if (!values.userGroupStatus) {
    errors.userGroupStatus = '必须选择一项'
  }
  if (!values.description) {
    errors.description = '描述未填写'
  } else if (values.description.length > 50) {
    errors.description = '超过50个字符'
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
  <div className={'form-group '+(field.meta.touched &&(field.meta.error &&' has-error'))}>
    <label htmlFor="groupId" className="col-sm-2 control-label">组名称</label>
    <div className="col-sm-8">
      <input className={validatorCalss(field.meta)} name={field.name} maxLength={field.maxLength} {...field.input} placeholder={field.placeholder} type={field.type}/>
      {field.meta.touched && (field.meta.error && <span className="help-block">{field.meta.error}</span>)}
    </div>
  </div>
)


@reduxForm({
  form: 'addUserGroup',
  validate
})

class UserManage extends Component {
  constructor(props) {
    super(props)
    this.addUserGroup=this.addUserGroup.bind(this)
  }

  static fetchData() {
    console.log('AddUserGroup文件中执行了fetchData')
    return [Actions.getParentUserGroups()]
  }

  static propTypes = {
    parentUserGroups: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    dirty: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
  };


  componentDidMount() {
    console.log('componentDidMount执行了')
    const {actions, parentUserGroups} = this.props
    if (parentUserGroups.length < 1) {
      actions.getParentUserGroups()
    }
  }

  addUserGroup() {
    const { actions } = this.props
    actions.addUserGroup()
  }

  render() {
    const {parentUserGroups, dirty, invalid,handleSubmit}=this.props;
    parentUserGroups.unshift( {
      group_id:1,
      name:'无',
      description:'无',
      power:[],
      parent:'',
      status:true
    },);
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {AppConfig.userManage[1]}
            <small>{AppConfig.addUserGroup[1]}</small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i>主页6{parentUserGroups.length}</a></li>
            <li><a href="#">{AppConfig.userManage[1]}</a></li>
            <li className="active">{AppConfig.addUserGroup[1]}</li>
          </ol>
        </section>


        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">添加用户组</h3>
                </div>

                <form className="form-horizontal" onSubmit={handleSubmit(this.addUserGroup)}>
                  <div className="box-body">



                    <Field name="groupId" component={renderField} type="text" placeholder="组名称"/>



                    <div className="form-group">
                      <label className="col-sm-2 control-label">父级组</label>
                      <div className="col-sm-8">
                        <Field name="parentUserGroups" component="select" className="form-control">
                          <option value="">-- 请选择 --</option>
                          {
                            parentUserGroups.map((item, index)=>
                              <option key={index} value={item.group_id}>{(item.parent?'\u00A0\u00A0\u00A0\u00A0':'')+item.name}</option>
                            )
                          }


                        </Field>

                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">状态</label>
                      <div className="col-sm-8">
                        <Field name="userGroupStatus" component="select" className="form-control">
                          <option value="">-- 请选择 --</option>
                          <option value="1">启用</option>
                          <option value="0">禁用</option>
                        </Field>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">描述</label>
                      <div className="col-sm-8">
                        <Field name="description" component="textarea" className="form-control" placeholder="描述信息" rows="3"/>
                      </div>
                    </div>
                  </div>

                  <div className="box-footer">
                    <input disabled={ dirty && invalid } type="submit" className="btn btn-primary pull-right" value="添加"/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserManage))