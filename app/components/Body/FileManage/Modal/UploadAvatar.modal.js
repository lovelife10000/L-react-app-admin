import React,{Component} from 'react'
// import {AppConfig} from '../../../../config/app.config'
import AvatarEditor from 'react-avatar-editor'
// import Avatar from '../../../../assets/img/shanghai.jpg'
import IconSlider from '../../../UI/IconSlider'



class UploadAvatarModal extends Component{
  constructor(){
    super()
    this.getSliderVal=this.getSliderVal.bind(this)
    this.state={
      scale:1
    };
  }

  getSliderVal(value){
    this.setState({
      scale:value,
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



  render(){

    return(
      <div className="modal fade" id="media_manage_upload_tip_modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">编辑</h4>
            </div>
            <div className="modal-body text-center">
              <AvatarEditor
                image={'http://img.blog.csdn.net/20170426102451883?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvVGFrZV9EcmVhbV9hc19Ib3JzZQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'}
                width={250}
                height={250}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={this.state.scale || 1}
                rotate={0}
                borderRadius={125}
                ref={this.setEditorRef}

              />
              <IconSlider min={1} max={2} getSliderVal={this.getSliderVal}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">保存</button>
            </div>
          </div>

        </div>

      </div>
    )
  }

}

export default UploadAvatarModal
