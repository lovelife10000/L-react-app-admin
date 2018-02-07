import React, {Component} from 'react'
import PropTypes from 'prop-types'

class NotificationItem extends Component {
  constructor() {
    super()

  }

  static propTypes = {
    theme: PropTypes.string,
    content: PropTypes.string

  };

  render() {
    return (
      <li key={'header-notification-item'}>
        <a href="#">
          <i className={this.props.theme}></i> {this.props.content}
        </a>
      </li>
    )
  }
}
export default NotificationItem