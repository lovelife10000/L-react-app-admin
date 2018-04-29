import React, {Component} from 'react';
import {Breadcrumb} from 'antd';

import PropTypes from 'prop-types'
import * as Actions from 'actions'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './index.less';


const mapStateToProps = state => {
  return {
    allUserGroups: state.allUserGroups.toJS()
  }
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
};


class BreadcrumbComp extends Component {
  constructor(props) {
    super(props)

  }

  static propTypes = {
    allUserGroups: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    category:PropTypes.string.isRequired,
    item:PropTypes.string.isRequired,
  };


  render() {


    return (
      <Breadcrumb className={styles.breadcrumb} separator=">">
        <Breadcrumb.Item>主页</Breadcrumb.Item>
        <Breadcrumb.Item>{this.props.category}</Breadcrumb.Item>
        <Breadcrumb.Item>{this.props.item}</Breadcrumb.Item>
      </Breadcrumb>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BreadcrumbComp))