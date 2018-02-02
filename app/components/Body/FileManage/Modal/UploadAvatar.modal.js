import React, {Component} from 'react'
// import {AppConfig} from '../../../../config/app.config'
import AvatarEditor from 'react-avatar-editor'
// import Avatar from '../../../../assets/img/shanghai.jpg'
import IconSlider from '../../../UI/IconSlider'
import {Modal,Button} from 'react-bootstrap';
import PropTypes from 'prop-types'


class UploadAvatarModal extends Component {
  constructor(props) {
    super(props)
    this.getSliderVal = this.getSliderVal.bind(this)
    this.state = {
      scale: 1,
    };
  }
  static propTypes={
    show:PropTypes.bool,
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
  };

  getSliderVal(value) {
    this.setState({
      scale: value,
    })

  }

  // onClickSave = () => {
  //   if (this.editor) {
  //     // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
  //     // drawn on another canvas, or added to the DOM.
  //     const canvas = this.editor.getImage()
  //
  //     // If you want the image resized to the canvas size (also a HTMLCanvasElement)
  //     const canvasScaled = this.editor.getImageScaledToCanvas()
  //   }
  // }
  setEditorRef = (editor) => this.editor = editor



  render() {



    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>编辑</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
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
            <IconSlider min={1} max={2} getSliderVal={this.getSliderVal}/>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.props.onSave}>保存</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

}

export default UploadAvatarModal
