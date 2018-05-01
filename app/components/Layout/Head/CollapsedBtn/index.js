import React, {Component} from 'react';
import {Icon} from 'antd';
import PropTypes from 'prop-types'
import styles from './index.less'

class CollapsedBtn extends Component {
  constructor() {
    super()
  }

  static propTypes = {

    collapsed: PropTypes.bool,
    onCollapse: PropTypes.func,


    onToggle: PropTypes.func,
  };


  render() {
    return (
      <Icon
        className={styles.trigger}
        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={this.props.onToggle}
      />
    );
  }
}

export default CollapsedBtn
