import React, {Component} from 'react'
// import PropTypes from 'prop-types'
// import MessageItem from './message-item'
// import { Dropdown } from 'react-bootstrap'
// import defaultAvatar from '../../assets/images/avatar.png'
// import Avatar from './avatar'

class HeaderMessages extends Component {
  constructor(){
    super()
  }
  render() {
    return (
      <li className="dropdown messages-menu">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-envelope-o">1</i>
          <span className="label label-success">2</span>
        </a>
        <ul className="dropdown-menu">
          <li className="header">You have  messages</li>
          <li>
            {/* inner menu: contains the actual data */}
            <div className="slimScrollDiv">

              <ul className="menu">
                {/*{messageList}*/}
              </ul>

              <div className="slimScrollBar"></div>
              <div className="slimScrollRail"></div>
            </div>
          </li>
          <li className="footer"><a href="#">See All Messages</a></li>
        </ul>
      </li>
    )
  }
}

export default  HeaderMessages
