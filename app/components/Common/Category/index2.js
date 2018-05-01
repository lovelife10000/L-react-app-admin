import React, {Component} from 'react'

import PropTypes from 'prop-types'

import {Form, Select, Col,} from 'antd';


const FormItem = Form.Item;


class Category extends Component {
    constructor(props) {

        super(props)
        this.state = {
            categories: [{
                name: '无',
                slug: "",
                parentId: '0',
                _id: '0'
            }]
        }

    }  componentWillMount() {

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

        handleSubmit: PropTypes.func,
    };


    handleSelectChange = (value) => {
        this.props.data.form.resetFields('secondCate')
    }
    handleSelectChange2 = (value) => {
        this.props.data.form.resetFields('thirdCate')
    }

    isError(name) {

        return this.props.data.form.isFieldTouched(name) && this.props.data.form.getFieldError(name);
    }


    render() {
//         console.log('cat')
// debugger
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


        const categories =this.state.categories.concat( this.props.data.cate);
        // debugger
        const {getFieldDecorator, getFieldValue,} = this.props.data.form;
        return (


            <FormItem
                {...formItemLayout}
                label="父级分类"
                required
            >

                <Col span={8}>
                    <FormItem
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
                                    <Option key={index} value={item._id}>{item.name}</Option>
                                ))
                            }
                        </Select>)}
                    </FormItem>
                </Col>

                {
                    getFieldValue('firstCate') &&  getFieldValue('firstCate') !=='0' && (categories.filter((item) => item.parentId === getFieldValue('firstCate')).length > 0)
                        ?
                        <div>
                            <Col span={1}>
                    <span style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>
                     -
                    </span>
                            </Col>
                            <Col span={7}>
                                <FormItem
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
                                                categories.filter((item) => {
                                                    console.log('66', getFieldValue('firstCate'));
                                                    return item.parentId === getFieldValue('firstCate')
                                                }).map((item, index) => (
                                                    <Option key={index} value={item._id}>{item.name}</Option>
                                                ))
                                            }

                                        </Select>)}
                                </FormItem>
                            </Col>
                        </div> : null
                }

                {getFieldValue('secondCate') && (categories.filter((item) => item.parentId === getFieldValue('secondCate')).length > 0) ?
                    <div>
                        <Col span={1}>
                  <span style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>
                  -
                  </span>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                validateStatus={this.isError('thirdCate') ? 'error' : ''}
                                help={this.isError('thirdCate') || ''}
                            >
                                {getFieldDecorator('thirdCate', {
                                    rules: [{
                                        required: true,
                                        message: '必须选择一项'
                                    }],
                                })(
                                    <Select placeholder="请选择">
                                        {
                                            categories.filter((item) => {
                                                console.log('77', getFieldValue('secondCate'));
                                                return item.parentId === getFieldValue('secondCate')
                                            }).map((item, index) => (
                                                <Option key={index} value={item._id}>{item.name}</Option>
                                            ))
                                        }
                                    </Select>)}
                            </FormItem>
                        </Col>
                    </div> : ''
                }


            </FormItem>


        )
    }
}

export default Category