import React, {Component} from 'react'
import {AppConfig} from '../../../../config/app.config'
import UploadAvatarModal from './Modal/UploadAvatar.modal'
import {Upload, Icon} from 'antd'
import * as Actions from '../../../../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

const Dragger = Upload.Dragger;


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const mapStateToProps = (state)=> {
  return {
    auth:state.auth.toJS()
  }
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}


class UploadAvatar extends Component {
  constructor() {
    super()
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
    this.uploadAvatar=this.uploadAvatar.bind(this)
    this.state = {
      loading: false,
      allowZoomOut: false,
      position: {x: 0.5, y: 0.5},
      scale: 1,
      rotate: 0,
      borderRadius: 0,
      preview: null,
      width: 200,
      showModal: false,
      image: null,
      uploadImage:'',
      height: 200
    }

  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
  };

  close() {
    this.setState({
      showModal: false
    });
  }

  open() {
    this.setState({
      showModal: true
    });
  }


  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({loading: true});
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
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
    },() => {
      console.log('this.state is',this.state.uploadImage)
      this.uploadAvatar()
    });
    console.log('this.state is 2', this.state.image)

  }

  // componentDidUpdate(){
  //   console.log('this.state is',this.state.uploadImage)
  //   this.uploadAvatar()
  // }
  componentWillReceiveProps(nextProps){
    const { auth } = this.props
    if(auth.user !== nextProps.auth.user){
      this.close()
    }
  }

  uploadAvatar(){

    let data=null;
    if(this.state.uploadImage){
      data=this.state.uploadImage
    }
    console.log('上传1',data);
    this.props.actions.uploadAvatar({
      avatar:data
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


  render() {
    const that = this;
    const props = {
      name: 'file',
      multiple: false,
      action: '/fileManage/uploadAvatar',
      showUploadList: false,
      beforeUpload: (file, fileList) => {
        return false
      },
      onChange(info) {
        that.setState({image: info.file})
        that.open()


      },
      // customRequest:function () {
      //
      // }
    };


    return (
      <div className="content-wrapper">
        <UploadAvatarModal
          show={this.state.showModal}
          hideModal={this.close}
          image={this.state.image || 'avatar.jpg'}
          ref={'bb'}
          scale={parseFloat(this.state.scale)}
          position={this.state.position}
          onPositionChange={this.handlePositionChange}
          rotate={parseFloat(this.state.rotate)}
          borderRadius={this.state.borderRadius}
          onSave={this.handleSave}
          onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
          onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
          onImageReady={this.logCallback.bind(this, 'onImageReady')}
          onImageLoad={this.logCallback.bind(this, 'onImageLoad')}
          onDropFile={this.logCallback.bind(this, 'onDropFile')}
        />
        <section className="content-header">
          <h1>
            {AppConfig.fileManage[1]}
            <small>{AppConfig.uploadAvatar[1]}</small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i>主页</a></li>
            <li><a href="#">{AppConfig.fileManage[1]}</a></li>
            <li className="active">{AppConfig.uploadAvatar[1]}</li>
          </ol>
        </section>


        <section className="content">
          <div className="row">
            <div className="col-md-12">


              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">{AppConfig.uploadAvatar[1]}</h3>
                </div>

                <div className="box-body text-center">


                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox"/>
                    </p>
                    <p className="ant-upload-text">支持拖拽上传</p>
                    <p className="ant-upload-hint">最大上传文件大小：64 MB。</p>
                  </Dragger>

                  {/*<div>*/}
                  {/*<ReactAvatarEditor*/}
                  {/*// ref={this.setEditorRef}*/}
                  {/*scale={parseFloat(this.state.scale)}*/}
                  {/*width={this.state.width}*/}
                  {/*height={this.state.height}*/}
                  {/*position={this.state.position}*/}
                  {/*onPositionChange={this.handlePositionChange}*/}
                  {/*rotate={parseFloat(this.state.rotate)}*/}
                  {/*borderRadius={this.state.borderRadius}*/}
                  {/*onSave={this.handleSave}*/}
                  {/*onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}*/}
                  {/*onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}*/}
                  {/*onImageReady={this.logCallback.bind(this, 'onImageReady')}*/}
                  {/*onImageLoad={this.logCallback.bind(this, 'onImageLoad')}*/}
                  {/*onDropFile={this.logCallback.bind(this, 'onDropFile')}*/}
                  {/*image={this.state.image || 'avatar.jpg'}*/}
                  {/*/>*/}
                  {/*<br />*/}
                  {/*New File:*/}
                  {/*<input name='newImage' type='file' onChange={this.handleNewImage} />*/}
                  {/*<br />*/}

                  {/*<input type='button' onClick={this.handleSave} value='Preview' />*/}
                  {/*<br />*/}
                  {/*{!!this.state.preview &&*/}
                  {/*<img*/}
                  {/*src={this.state.preview.img}*/}
                  {/*style={{*/}
                  {/*borderRadius: `${(Math.min(*/}
                  {/*this.state.preview.height,*/}
                  {/*this.state.preview.width) +*/}
                  {/*10) **/}
                  {/*(this.state.preview.borderRadius / 2 / 100)}px`*/}
                  {/*}}*/}
                  {/*/>}*/}

                  {/*</div>*/}

                </div>

              </div>
            </div>

          </div>

        </section>

      </div>
    )
  }

}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadAvatar))