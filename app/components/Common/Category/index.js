import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Col, } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

function ifHasChild(arr, idV) {
  for (let x of arr) {

    if (x.id === idV) {

      if (x.children) {

        return true
      } else {
        return false
      }
    }
  }
}

class Category extends Component {
  constructor(props) {

    super(props)
    this.state = {
      categories: [{
        name: '无',
        slug: '',
        parentId: '0',
        id: '0',
        level: 1
      }]
    }

  }

  componentWillMount() {

    // console.log('cat')
    // debugger
  }

  componentDidMount() {
    // console.log('cat')
    // debugger

  }


  static propTypes = {
    categories: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func,
    data: PropTypes.object.isRequired,
  };


  handleSelectChange = (value) => {
    this.props.data.form.resetFields('secondCate')
  }
  handleSelectChange2 = (value) => {
    this.props.data.form.resetFields('thirdCate')
  }

  isError(name) {

    return this.props.data.form.isFieldTouched(name) && this.props.data.form.getFieldError(name)
  }


  render() {
    //         console.log('cat')
    // debugger
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    }


    const categories = this.state.categories.concat(this.props.data.cate)
    // debugger

    const { getFieldDecorator, getFieldValue, isFieldTouched } = this.props.data.form
    return (


      <FormItem
        {...formItemLayout}
        label="父级分类"
        required
      >

        <Col span={8}>
          <FormItem
            hasFeedback={isFieldTouched('firstCate') ? true : false}
            validateStatus={this.isError('firstCate') ? 'error' : ''}
            help={this.isError('firstCate') || ''}
          >
            {getFieldDecorator('firstCate', {
              rules: [{
                required: true,
                message: '必须选择一项'
              }],
            })(<Select placeholder="请选择" onChange={this.handleSelectChange}>
              {
                categories.filter((item) => item.parentId === '0').map((item, index) => (
                  <Option key={index} value={item.id}>{item.name}</Option>
                ))
              }
            </Select>)}
          </FormItem>
        </Col>

        {
          getFieldValue('firstCate') && (ifHasChild(categories, getFieldValue('firstCate')))
            ?
            <div>
              <Col span={1}>
                <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                  -
                </span>
              </Col>
              <Col span={7}>
                <FormItem
                  hasFeedback={isFieldTouched('secondCate') ? true : false}
                  validateStatus={this.isError('secondCate') ? 'error' : ''}
                  help={this.isError('secondCate') || ''}
                >
                  {getFieldDecorator('secondCate', {
                    rules: [{
                      required: true,
                      message: '必须选择一项'
                    }],
                  })(
                    <Select placeholder="请选择" onChange={this.handleSelectChange2}>
                      {

                        [{
                          name: '无',
                          slug: '',
                          parentId: '0',
                          id: '0',
                          level: 1
                        }].concat(categories.filter((item) => (item.id === getFieldValue('firstCate')
                        ))[0].children).map((item, index, arr) => {

                          return (<Option key={index} value={item.id}>{item.name}</Option>)
                        })
                      }

                    </Select>)}
                </FormItem>
              </Col>
            </div> : null
        }


      </FormItem>


    )
  }
}

export default Category