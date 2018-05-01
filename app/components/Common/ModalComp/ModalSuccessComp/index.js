import {Modal} from 'antd';
import React, {Component} from 'react'

class ModalSuccessComp extends Component{
    componentDidMount(){
        this.success()
    }
    success(){
        const {showModal}=this.props.data
        debugger
        Modal.success({
            title: showModal.title,
            content: showModal.content,
        });
    }

    render(){
        return(
            <div></div>
        )
    }
}

export default ModalSuccessComp
