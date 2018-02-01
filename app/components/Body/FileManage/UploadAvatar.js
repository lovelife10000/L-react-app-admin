import React,{Component} from 'react'
import {AppConfig} from '../../../config/app.config'
import UploadAvatarModal from './Modal/UploadAvatar.modal'

import { Upload, Icon, message } from 'antd';
const Dragger = Upload.Dragger;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


class UploadAvatar extends Component{
  constructor(){
    super()
    this.state={

      loading: false,
    }
  }








  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
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

  render(){
    const props = {
      name: 'file',
      multiple: false,
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange(info) {
        console.log('info is ',info)
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return(
      <div className="content-wrapper">
        <UploadAvatarModal/>
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
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">支持拖拽上传</p>
                    <p className="ant-upload-hint">最大上传文件大小：64 MB。</p>
                  </Dragger>




                  <button type="button" className="btn btn-primary btn-xs btn-flat" data-toggle="modal"                 data-target="#media_manage_upload_tip_modal">编辑</button>



                </div>

              </div>
            </div>

          </div>

        </section>

      </div>
    )
  }

}

export default UploadAvatar