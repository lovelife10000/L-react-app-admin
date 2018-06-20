import React, {Component} from 'react'
import AppConfig from 'config/app'
import {Upload, Icon, Card,} from 'antd'
import * as Actions from 'actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import BreadcrumbComp from 'components/Common/BreadcrumbComp'

const Dragger = Upload.Dragger
import UploadAvatarModal from './UploadAvatarModal'


function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.toJS()
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}


class UploadAvatar extends Component {
  constructor(props) {
    super(props)
    // this.uploadAvatar = this.uploadAvatar.bind(this)
    // this.showModal = this.showModal.bind(this)
    // this.hideModal = this.hideModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.state = {
      loading: false,
      allowZoomOut: false,
      position: {x: 0.5, y: 0.5},
      scale: 1,
      rotate: 0,
      borderRadius: 0,
      preview: null,
      width: 200,
      image: null,
      uploadImage: '',
      visible: false,
      height: 200
    }


  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    show: PropTypes.bool,
    hideModal: PropTypes.func,
    image: PropTypes.string,
    onPositionChange: PropTypes.func,
    onSave: PropTypes.func,
    onLoadFailure: PropTypes.func,
    onLoadSuccess: PropTypes.func,
    onImageReady: PropTypes.func,
    onImageLoad: PropTypes.func,
    onDropFile: PropTypes.func,
    position: PropTypes.object,

  };



  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({loading: true})
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }))
    }
  }


  ///////////////////////

  handleNewImage = e => {
    console.log('handleNewImage0', e.target.files[0])
    this.setState({
      image: e.target.files[0],
    })
    console.log('handleNewImage', this.state.image)

  }


  handleSave = data => {
    console.log('this is 2',this.refs)
    // const img = this.editor.getImageScaledToCanvas().toDataURL()
    const img2 = this.refs.bb.refs.cc.getImageScaledToCanvas().toDataURL()

    const rect = this.refs.bb.refs.cc.getCroppingRect()

    this.setState({
      preview: {
        img2,
        rect,
        scale: this.state.scale,
        width: this.state.width,
        height: this.state.height,
        borderRadius: this.state.borderRadius
      },
      uploadImage: img2,
    }, () => {
      console.log('this.state is', this.state.uploadImage)
      this.uploadAvatar()
    })
    console.log('this.state is 2', this.state.image)

  }


  componentWillReceiveProps(nextProps) {
    const {auth} = this.props
    if (auth.user !== nextProps.auth.user) {
      this.hideModal()
    }
  }

  uploadAvatar() {

    let data = null
    if (this.state.uploadImage) {
      data = this.state.uploadImage
    }
    console.log('上传1', data)
    this.props.actions.uploadAvatar({
      avatar: data
    })
  }


  logCallback(e) {
    console.log('callback', e)
  }

  setEditorRef = editor => {
    console.log('editor is ', editor.cc())
    if (editor) this.editor = editor
  }

  handlePositionChange = position => {
    console.log('Position set to', position)
    this.setState({position})
  }

  /////////////////////

  showModal = () => {
    console.log('show')
    this.setState({
      visible: true,
    })
  }
  hideModal = () => {
    this.setState({
      visible: false,
    })
  }

  handleOk = (e) => {
    console.log('this is',this.refs)
    this.setState({
      visible: false,
    })
    this.handleSave()
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    })
  }

  beforeUpload(file, fileList)  {
    return false
  }

  onChange(info)  {
    this.setState({image: info.file})
    this.showModal()
  }

  render() {

    return (
      <Card bordered={false}>
        <UploadAvatarModal
          visible={this.state.visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel.bind(this)}
          image={this.state.image || 'avatar.jpg'}
          ref={'bb'}
          scale={parseFloat(this.state.scale)}
          position={this.state.position}
          onPositionChange={this.handlePositionChange}
          rotate={parseFloat(this.state.rotate)}
          borderRadius={this.state.borderRadius}

          onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
          onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
          onImageReady={this.logCallback.bind(this, 'onImageReady')}
          onImageLoad={this.logCallback.bind(this, 'onImageLoad')}
          onDropFile={this.logCallback.bind(this, 'onDropFile')}
        />
        <BreadcrumbComp category={AppConfig.fileManage[1]} item={AppConfig.uploadAvatar[1]}/>
        <Dragger
          name='file'
          multiple='false'
          action='/fileManage/uploadAvatar'
          showUploadList='false'
          beforeUpload={this.beforeUpload}
          onChange={this.onChange.bind(this)}
        >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox"/>
          </p>
          <p className="ant-upload-text">支持拖拽上传</p>
          <p className="ant-upload-hint">最大上传文件大小：64 MB。</p>
        </Dragger>
      </Card>
    )
  }

}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadAvatar))