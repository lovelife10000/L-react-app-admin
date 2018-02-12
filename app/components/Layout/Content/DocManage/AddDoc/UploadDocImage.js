import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../../actions'
import {bindActionCreators} from 'redux'
import {Upload, Icon, Modal,Form} from 'antd';
const FormItem = Form.Item;



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
    console.log('fileList is',fileList)
    this.changeToBase64(fileList[0])
  }

  changeToBase64(file){
    const that=this;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      var result = this.result;
      that.props.getImageBase64(result);
    };

  }

  render() {

    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const uploadProps={
      beforeUpload:function(){
        return false
      }

    };
    return (

      <div className="clearfix">
        <FormItem
          {...this.props.formItemLayout}
          label="状态"
        >
          <Upload
            {...uploadProps}
            action="/docManage/uploadDocImage"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{width: '100%'}} src={previewImage}/>
          </Modal>
        </FormItem>




      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'addUser',
})(UploadDocImage))