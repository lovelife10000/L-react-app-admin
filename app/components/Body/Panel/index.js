import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import * as Actions from '../../../actions'
import BasicInfo from './BasicInfo'
// import {isLogin} from '../../../utils/auth.util'
import PropTypes from 'prop-types'
import { isLogin} from '../../../utils/auth.util'


const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}


class Panel extends Component {
  constructor(props) {
    super(props)


  }
  static propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object.isRequired,

  }

  componentWillMount(){

    if(!isLogin()) {
      // window.location.href='/login'
      this.props.history.replace('/login')
    }
  }


  // static fetchData(params){
  //   return [Actions.getSnsLogins()]
  // }



  render() {

    return (
      <div>
        <BasicInfo/>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Panel))