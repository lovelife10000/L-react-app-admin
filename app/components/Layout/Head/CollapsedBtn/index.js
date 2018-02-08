import React, {Component} from 'react';
import {Icon} from 'antd';
import PropTypes from 'prop-types'

class CollapsedBtn extends Component {
  constructor() {
    super()
    this.state = {
      collapsed: false,
    };
  }

  static propTypes = {
    notices: PropTypes.func,
    collapsed: PropTypes.func,
    onCollapse: PropTypes.func,
    fetchingNotices: PropTypes.func,
    logo: PropTypes.func,
    onNoticeVisibleChange: PropTypes.func,
    onMenuClick: PropTypes.func,
    onNoticeClear: PropTypes.func,
    isMobile: PropTypes.func,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }


  render() {
    return (
      <Icon
        className="trigger"
        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={this.toggle}
      />
    );
  }
}

export default CollapsedBtn
