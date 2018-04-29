import React, {Component} from 'react'
import AppConfig from 'config/app.config'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as Actions from 'actions'
import {bindActionCreators} from 'redux'

import BreadcrumbComp from 'components/Common/BreadcrumbComp'
import {
  Form, Input, Button, Card,message,
} from 'antd';





// import styles from './style.less';

const FormItem = Form.Item;


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




class AddTag extends Component {

  constructor(props) {
    super(props)


  }


  static propTypes = {
    allUserGroups: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    dirty: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    form: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    isError: PropTypes.func,
  };

  success = (msg) => {
    message.success(msg);
  };

  error = (msg) => {
    message.error(msg);
  };

  warning = (msg) => {
    message.warning(msg);
  };

  componentDidMount() {

    const {actions, categories} = this.props

    if (categories.length < 1) {
      actions.getCategories()
    }
  }



  handleSubmit = (e) => {
    console.log('allUserGroups is 3')
    e.preventDefault();
    const that=this;
    this.props.form.validateFields((err, values) => {
      const my=that;
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.addTag(values).then(function(result) {
          if (result.success) {
            my.success(result.msg)
          }
        }
        );

      }else{
        console.log('handleSubmit 出错',err)
      }
    });
  }

  isError(name) {
    console.log('touch',name,this.props.form.isFieldTouched(name),this.props.form.getFieldError(name))
    return this.props.form.isFieldTouched(name) && this.props.form.getFieldError(name);
  }




  render() {

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };

    const {getFieldDecorator, } = this.props.form;

    return (
      <Card bordered={false}>
        <BreadcrumbComp category={AppConfig.docManage[1]} item={AppConfig.addTag[1]}/>

        <Form
          onSubmit={this.handleSubmit}
          style={{marginTop: 8}}
        >
          <FormItem
            {...formItemLayout}
            label="名称"
            validateStatus={this.isError('name') ? 'error' : ''}
            help={this.isError('name') || ''}
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                max:16,
                message: '长度太长'
              }],
            })(
              <Input placeholder="名称"/>
            )}
          </FormItem>


          <FormItem
            {...formItemLayout}
            label="别名"
            validateStatus={this.isError('slug') ? 'error' : ''}
            help={this.isError('slug') || ''}
          >
            {getFieldDecorator('slug', {
              rules: [{
                required: true,
                pattern:/^[a-zA-z]\w{1,30}$/,
                message: '不符合规则'
              }],
            })(
              <Input placeholder="别名"/>
            )}
          </FormItem>


          <FormItem {...submitFormLayout} style={{marginTop: 32}}>
            <Button type="primary" htmlType="submit">
              添加
            </Button>

          </FormItem>

        </Form>
      </Card>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddTag))