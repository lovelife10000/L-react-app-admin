import { Modal } from 'antd'
import React, { Component } from 'react'

import PropTypes from 'prop-types'

class ModalSuccessComp extends Component {


  static propTypes = {
    showModal: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,

  };
  componentDidMount() {
    this.success()
  }
  success() {
    const { showModal } = this.props.data

    Modal.success({
      title: showModal.title,
      content: showModal.content,
    })
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default ModalSuccessComp
