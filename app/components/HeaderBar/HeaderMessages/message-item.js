import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import { Link, NavLink } from 'react-router-dom'
// import { Dropdown } from 'react-bootstrap'
// import defaultAvatar from '../../assets/images/avatar.png'
// import Avatar from './avatar'

export default class Header extends Component {
  constructor() {
    super()

  }

  static propTypes = {

    displayPicture: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired

  }


  render() {
    let {title, displayPicture, time, content}=this.props
    return (
      <li>
        {/* start message */}
        <a href="#">
          <div className="pull-left">
            <img src={displayPicture} className="img-circle" alt="User Image"/>
          </div>
          <h4>
            {title}
            <small><i className="fa fa-clock-o"></i> {time}</small>
          </h4>
          <p>{content}</p>
        </a>
      </li>
    )
  }
}