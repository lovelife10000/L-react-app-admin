import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import HeaderMessages from './HeaderMessages/header-messages'
import HeaderNotifications from './HeaderNotifications/header-notifications'
import HeaderTasks from './HeaderTasks/header-tasks'
// import { Dropdown } from 'react-bootstrap'
// import defaultAvatar from '../../assets/images/avatar.png'
// import Avatar from './avatar'

class HeaderBar extends Component {
  constructor() {
    super()

  }

  // static propTypes = {
  //
  // }

  pushMenu() {
    var body = document.body;
    if (body.clientWidth > 768) {
      if (body.className.indexOf('sidebar-collapse') === -1) {
        body.className += ' sidebar-collapse';
      } else {
        body.className = body.className.replace(' sidebar-collapse', '');
      }
    } else {
      if (body.className.indexOf('sidebar-open') === -1) {
        body.className += ' sidebar-open';
      } else {
        body.className = body.className.replace(' sidebar-open', '');
      }
    }
  }

  render() {
    return (
      <header className="main-header">

        <a href="index2.html" className="logo">

          <span className="logo-mini"><b>A</b>LT</span>

          <span className="logo-lg"><b>Admin</b>LTE</span>
        </a>

        <nav className="navbar navbar-static-top" role="navigation">

          <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button" onClick={this.pushMenu}>
            <span className="sr-only">Toggle navigation</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">

              <HeaderMessages />

              <HeaderNotifications />

              <HeaderTasks />

              <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <img src="dist/img/user2-160x160.jpg" className="user-image" alt="User Image"/>
                  <span className="hidden-xs">Alexander Pierce</span>
                </a>
                <ul className="dropdown-menu">

                  <li className="user-header">
                    <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
                    <p>
                      Alexander Pierce - Web Developer
                      <small>Member since Nov. 2012</small>
                    </p>
                  </li>

                  <li className="user-body">
                    <div className="col-xs-4 text-center">
                      <a href="#">Followers</a>
                    </div>
                    <div className="col-xs-4 text-center">
                      <a href="#">Sales</a>
                    </div>
                    <div className="col-xs-4 text-center">
                      <a href="#">Friends</a>
                    </div>
                  </li>

                  <li className="user-footer">
                    <div className="pull-left">
                      <a href="#" className="btn btn-default btn-flat">Profile</a>
                    </div>
                    <div className="pull-right">
                      <a href="#" className="btn btn-default btn-flat">Sign out</a>
                    </div>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}

export default  HeaderBar
