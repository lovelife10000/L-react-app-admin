import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Footer from './Footer/footer'
import * as Actions from '../actions'
// import routes from '../routes/routes'
import HeaderBar from '../components/Header'
import Sidebar from './Sidebar/navigation-menu'

const mapStateToProps = state =>{
  return {
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}


class App extends Component {
  constructor(props){
    super(props)
  }

  static fetchData({token}){
    console.log('App中获取用户信息')
    return [Actions.getUserInfo(token)]
  }

  static propTypes = {
    route: PropTypes.object.isRequired,
  }

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

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(App))