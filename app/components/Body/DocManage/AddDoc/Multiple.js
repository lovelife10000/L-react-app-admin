
import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {  Form, Select,} from 'antd';
const FormItem = Form.Item;

const Option = Select.Option;


class Multiple extends Component {

  constructor(props) {
    super(props)



  }

  static propTypes = {
    form: PropTypes.func,

  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>


        <FormItem
          {...formItemLayout}
          label="标签"
        >
          {getFieldDecorator('select-multiple', {
            rules: [
              { required: true, message: 'Please select your favourite colors!', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="Please select favourite colors">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          )}
        </FormItem>







      </Form>
    );
  }
}



export default Form.create()(Multiple)
          