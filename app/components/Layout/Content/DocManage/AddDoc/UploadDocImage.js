import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../../actions'
import {bindActionCreators} from 'redux'
import { Upload, Icon, Modal } from 'antd';





const mapStateToProps = state => {
  return {

  }
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
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    };


  }

  static propTypes = {
    dirty: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    actions: PropTypes.object.isRequired,
  };
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render() {

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div className="clearfix">


        <div className="form-group ">
          <label className="col-sm-2 control-label">缩略图</label>
          <div className="col-sm-8">
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </div>



      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
  form:'addUser',
})(UploadDocImage))