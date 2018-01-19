import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import Header from '../components/Header'
// import Toaster from '../components/Toaster'
// import ScrollTop from '../components/ScrollTop'
import Footer from './Footer/footer'
import * as Actions from '../actions'

import HeaderBar from '../components/HeaderBar'
import Sidebar from './Sidebar/navigation-menu'

const mapStateToProps = state =>{
  return {
    auth: state.auth.toJS(),
    showmsg: state.showmsg.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class App extends Component {
  constructor(props){
    super(props)
  }

  // static fetchData({token}){
  //   return [Actions.getUserInfo(token),Actions.getIndexImage()]
  // }


  static propTypes = {
    route: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    showmsg: PropTypes.object.isRequired,
    children: PropTypes.node,
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  // componentWillReceiveProps(nextProps){
  //   const { globalVal } = this.props
  //   if(globalVal.styleMode !== nextProps.globalVal.styleMode){
  //     document.body.className = nextProps.globalVal.styleMode
  //   }
  // }

  render() {
    // const { actions,showmsg } = this.props
    return (
      <div>
        <HeaderBar />
        <Sidebar />

        {renderRoutes(this.props.route.routes)}


        <Footer />
      </div>
    )
  }
}