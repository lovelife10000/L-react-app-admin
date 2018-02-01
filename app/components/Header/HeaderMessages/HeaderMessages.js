import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import MessageItem from './MessageItem'
// import { Dropdown } from 'react-bootstrap'
// import defaultAvatar from '../../assets/images/avatar.png'
import Avatar from '../../../../dist/img/user2-160x160.jpg'

class HeaderMessages extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    var messages = [
      {
        title: 'Support Team',
        displayPicture: Avatar,
        content: 'Why not buy a new awesome theme?',
        time: '5 mins',
      },
      {
        title: 'AdminLTE Design Team',
        displayPicture: Avatar,
        content: 'Why not buy a new awesome theme?',
        time: '2 hours',
      },
      {
        title: 'Developers',
        displayPicture: Avatar,
        content: 'Why not buy a new awesome theme?',
        time: 'Today',
      },
      {
        title: 'Sales Department',
        displayPicture: Avatar,
        content: 'Why not buy a new awesome theme?',
        time: 'Yesterday',
      },
      {
        title: 'Reviewers',
        displayPicture: Avatar,
        content: 'Why not buy a new awesome theme?',
        time: '2 days',
      }
    ];

    this.setState({
      messages: messages
    });
  }


  render() {
    var messageList = this.state.messages.map(function (messageDetails, iterator) {
      return (
        <MessageItem
          key={iterator}
          title={messageDetails.title}
          displayPicture={messageDetails.displayPicture}
          time={messageDetails.time}
          content={messageDetails.content}/>
      )
    });
    return (
      <li className="dropdown messages-menu">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-envelope-o"></i>
          <span className="label label-success">{this.state.messages.length}</span>
        </a>
        <ul className="dropdown-menu">
          <li className="header">你有 {this.state.messages.length}条信息</li>
          <li>
            {/* inner menu: contains the actual data */}
            <div className="slimScrollDiv">

              <ul className="menu">
                {messageList}
              </ul>

              <div className="slimScrollBar"></div>
              <div className="slimScrollRail"></div>
            </div>
          </li>
          <li className="footer"><a href="#">查看所有信息</a></li>
        </ul>
      </li>

    )
  }
}

export default  HeaderMessages
