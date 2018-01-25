import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Footer from '../Footer/footer'
import * as Actions from '../../actions'
// import routes from '../routes/routes'
import Header from '../Header'
import Sidebar from '../Sidebar/navigation-menu'

const mapStateToProps = state =>{
  return {
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}


class Home extends Component {
  constructor(props){
    super(props)
  }

  static fetchData({token}){
    console.log('App中获取用户信息')
    return [Actions.getUserInfo(token)]
  }

  // static propTypes = {
  //
  // }

  render() {
    // const { actions,showmsg } = this.props
    return (
      <div>
        <Header />
        <Sidebar />
        {/*{renderRoutes(this.props.route.routes)}*/}
        <Footer />
      </div>
    )
  }
}

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(Home))