import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as Actions from 'actions'
import {bindActionCreators} from 'redux'
import {Form, Icon,  Upload,Col,Button} from 'antd';
const FormItem = Form.Item;
import styles from './index.less'


const mapStateToProps = state => {
    return {}
};
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
};


class UploadDocImage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
        };


    }

    static propTypes = {
        formItemLayout: PropTypes.array,
        handleSubmit: PropTypes.func,
        actions: PropTypes.object.isRequired,
        getImageBase64: PropTypes.func,
    };
    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({fileList}) => {

        this.setState({fileList})
        this.changeToBase64(fileList[0])
    }

    changeToBase64(file) {

        const that = this;
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
            var result = this.result;


            that.props.getImageBase64(result);
        };


    }

    render() {

        const {previewVisible, previewImage, fileList} = this.state;
        const {data}=this.props

        const uploadProps = {
            beforeUpload: function () {
                return false
            }

        };
        return (

            <div className={styles.uploadImg}>
                <FormItem
                    {...this.props.formItemLayout}
                    label="缩略图"
                    required
                ><Col span={5}>
                    <Upload
                        {...uploadProps}
                        action="/docManage/uploadDocImage"
                        listType="text"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                    >
                            <Button>
                            <Icon type="上传" /> upload
                        </Button>



                    </Upload>
                </Col>
                    <Col span={19}><img className={styles.imgPreview} src={data.previewImg} alt=""/></Col>
                </FormItem>


            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(UploadDocImage))