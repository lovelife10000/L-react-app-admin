import React, {Component} from 'react'
import HeaderMessages from './HeaderMessages/header-messages'
import HeaderNotifications from './HeaderNotifications/header-notifications'
import HeaderTasks from './HeaderTasks/header-tasks'
// import { Dropdown } from 'react-bootstrap'
import defaultAvatar from '../../../dist/img/20625882.png'
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux'
import * as Actions from '../../actions'
import {connect} from 'react-redux'


const mapStateToProps=(state)=>{
  return{
    auth:state.auth.toJS()
  }
};

const mapDispatchToProps=(dispatch)=>{
  return{
    actions:bindActionCreators(dispatch,Actions)
  }
};

class Header extends Component {
  constructor(props) {
    super(props)

  }
  static propTypes={
    auth:PropTypes.object.isRequired,
    history: PropTypes.object,
  };





  render() {
    const {auth:{user}}=this.props

    return (
      <header className="main-header">

        <a href="index2.html" className="logo">

          <span className="logo-mini"><b>A</b>LT</span>

          <span className="logo-lg">L-react-app-admin</span>
        </a>

        <nav className="navbar navbar-static-top" role="navigation">

          <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button" >
            <span className="sr-only">Toggle navigation</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">

              <HeaderMessages />

              <HeaderNotifications />

              <HeaderTasks />

              <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <img src={defaultAvatar} className="user-image" alt="User Image"/>
                  <span className="hidden-xs">{user ? user.username :''}</span>
                </a>
                <ul className="dropdown-menu">

                  <li className="user-header">
                    <img src={defaultAvatar} className="img-circle" alt="User Image"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header)
