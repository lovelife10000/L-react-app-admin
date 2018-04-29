import React, {Component} from 'react'
import {Modal} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from 'actions'

const mapStateToProps = (state) => {
    return {
        showModal: state.showModal.toJS()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

class ModalComp extends Component {
    constructor(props) {
        super(props)


    }

    success() {
        Modal.success({
            title: 'This is a success message',
            content: 'some messages...some messages...',
        });
    }


    render() {
        const {showModal, data} = this.props;


        return (
            <div>

                <Modal {...data}  visible={showModal.visible}>
                    <p>{showModal.content}</p>

                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalComp)