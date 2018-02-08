import React, {Component} from 'react'
import {AppConfig} from '../../../../../config/app.config'
import * as Actions from '../../../../../actions'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'


const mapStateToProps = state => {
  return {
    categories: state.categories.toJS()
  }
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
};
const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = '分类名称未填写'
  } else if (!/^[\u4e00-\u9fa5\w]{3,10}$/.test(values.name)) {
    errors.name = '无效的分类名称'
  }


  if (!values.slug) {
    errors.slug = '英文别称未填写'
  } else if (!/^[a-zA-Z]{2,20}$/.test(values.slug)) {
    errors.slug = '无效的英文别称'
  }

  console.log('values.parentCategoryId',values.parentCategoryId)
  if (!values.parentCategoryId || values.parentCategoryId==='-- 请选择 --') {
    errors.parentCategoryId = '必须选择一项'
  }

  if (!values.sort) {
    errors.sort = '排序值未填写'
  }else if ((typeof Number(values.sort) !== 'number') || (values.sort%1!==0) || (values.sort>1000||values.sort<1)) {
    errors.sort = '排序值必须是1-1000的整数'

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
        <option>-- 请选择 --</option>
        {
          field.categories.map((item, index) =>
            <option key={index} value={item._id}>{(item.parent_category_id ? '\u00A0\u00A0\u00A0\u00A0' : '') + item.name}</option>
          )
        }
      </select>
      {field.meta.touched && (field.meta.error && <span className="help-block">{field.meta.error}</span>)}

    </div>
  </div>
)




class AddCategory extends Component {
  constructor(props) {
    super(props)
    this.addCategory = this.addCategory.bind(this)
  }


  static propTypes = {
    categories: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    dirty: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
  };


  componentDidMount() {

    const {actions, categories} = this.props
    if (categories.length < 2) {

      actions.getCategories()
    }
  }

  addCategory(data) {
    const {actions} = this.props
    actions.addCategory(data)
  }

  render() {
    const {categories, dirty, invalid, handleSubmit} = this.props;
    console.log('categories is',categories)
    categories.unshift({
      _id: '',
      name: '无',
      parent_category_id: ''
    });
    console.log('categories is2',categories)
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {AppConfig.docManage[1]}
            <small>{AppConfig.addCategory[1]}</small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i>主页</a></li>
            <li><a href="#">{AppConfig.docManage[1]}</a></li>
            <li className="active">{AppConfig.addCategory[1]}</li>
          </ol>
        </section>


        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">{AppConfig.addCategory[1]}</h3>
                </div>

                <form className="form-horizontal" onSubmit={handleSubmit(this.addCategory)}>
                  <div className="box-body">


                    <Field name="name" component={renderField} type="text" placeholder="分类名称"/>
                    <Field name="slug" component={renderField} type="text" placeholder="英文别称"/>
                    <Field className="form-control" name="parentCategoryId" component={renderFieldForSelect} type="text" placeholder="父级分类" categories={categories}/>


                    <Field name="sort" component={renderField} type="text" placeholder="排序值"/>
                  </div>

                  <div className="box-footer">
                    <input disabled={dirty && invalid} type="submit" className="btn btn-primary pull-right" value="添加"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'addCategory',
  validate,
  // parentCategoryId:'-- 请选择 --'
})(AddCategory))