import React, {Component} from 'react'
import { Modal, } from 'antd'
import PropTypes from 'prop-types'
import AvatarEditor from 'react-avatar-editor'
import IconSlider from 'components/Common/IconSlider'






class UploadAvatarModal extends Component {
  constructor() {
    super()
    // this.getSliderVal = this.getSliderVal.bind(this)
    this.state = {
      scale: 1,
    }


  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    visible:PropTypes.bool,
    hideModal:PropTypes.func,
    image:PropTypes.string,
    onPositionChange:PropTypes.func,
    onSave:PropTypes.func,
    onLoadFailure:PropTypes.func,
    onLoadSuccess:PropTypes.func,
    onImageReady:PropTypes.func,
    onImageLoad:PropTypes.func,
    onDropFile:PropTypes.func,
    position:PropTypes.object,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
  };

  getSliderVal(value) {
    console.log('getc')
    this.setState({
      scale: value,
    })

  }




  render() {



    return (
      <Modal
        title="编辑"
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
      >
        <AvatarEditor
          image={this.props.image}
          width={250}
          ref={'cc'}
          height={250}
          border={50}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={this.state.scale || 1}
          rotate={0}
          // borderRadius={125}
          position={this.props.position}
          onPositionChange={this.props.onPositionChange}
          onLoadFailure={this.props.onLoadFailure}
          onLoadSuccess={this.props.onLoadSuccess}
          onImageReady={this.props.onImageReady}
          onImageLoad={this.props.onImageLoad}
          onDropFile={this.props.onDropFile}

        />
        <IconSlider min={1} max={2} getSliderVal={this.getSliderVal.bind(this)}/>
      </Modal>
    )
  }

}


export default UploadAvatarModal