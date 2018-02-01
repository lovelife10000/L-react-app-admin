import React, {Component} from 'react'
import NotificationItem from './NotificationItem'

class HeaderNotifications extends Component {
  constructor() {
    super()
    this.state = {
      notifications: []
    };

  }



  componentDidMount() {
    var notifications = [{
      content: '5 new members joined today',
      theme: 'fa fa-users text-aqua'
    }, {
      content: 'Very long description here that may not fit into the page and may cause design problems',
      theme: 'fa fa-warning text-yellow'
    }, {
      content: '5 new members joined',
      theme: 'fa fa-users text-red'
    }, {
      content: '25 sales made',
      theme: 'fa fa-shopping-cart text-green'
    }, {
      content: 'You changed your username',
      className: 'fa fa-user text-red'
    }];

    this.setState({
      notifications: notifications
    });
  }

  render() {


    var notificationList = this.state.notifications.map(function (notificationDetails, iterator) {
      return (
        <NotificationItem
          key={iterator}
          theme={notificationDetails.theme}
          content={notificationDetails.content}/>
      )
    });
    return (
      <li className="dropdown notifications-menu">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-bell-o"></i>
          <span className="label label-warning">{this.state.notifications.length}</span>
        </a>

        <ul className="dropdown-menu">
          <li className="header">你有 {this.state.notifications.length}条通知</li>
          <li>
            {/* inner menu: contains the actual data */}
            <div className="slimScrollDiv">

              <ul className="menu">
                {notificationList}
              </ul>

              <div className="slimScrollBar"></div>
              <div className="slimScrollRail"></div>
            </div>
          </li>
          <li className="footer"><a href="#">查看所有通知</a></li>
        </ul>
      </li>
    )
  }
}

export default HeaderNotifications