import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import * as Actions from 'actions'
import AppConfig from 'config/app.config'
import BreadcrumbComp from 'components/Common/BreadcrumbComp'
import {
  Card
} from 'antd';
import {connect} from 'react-redux'


const mapStateToProps = state => {
  return {
    auth: state.auth.toJS(),

  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}


class BasicInfo extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {

    auth: PropTypes.object.isRequired,

  }


  // static fetchData(params) {
  //   return [Actions.getSnsLogins()]
  // }


  render() {
    // const {auth: {user}} = this.props

    return (
      <Card bordered={false}>
        <BreadcrumbComp category={AppConfig.userManage[1]} item={AppConfig.addUserGroup[1]}/>
      </Card>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BasicInfo)