import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
// import Footer from '../Footer/footer'
import * as Actions from '../../actions'
// import Header from '../Header'
// import Sidebar from '../Sidebar'
import {renderRoutes} from 'react-router-config'
import {isLogin} from '../../utils/auth.util'


import {Layout, Icon} from 'antd';

const {Header, Content, Footer} = Layout;
import SiderBar from './Sidebar'


const mapStateToProps = state => {
  return {
    auth: state.auth.toJS(),
    globalVal: state.globalVal.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}


class Layout2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    };
  }

  static fetchData({token}) {
    console.log('Layout中fetchData')
    return [Actions.getUserInfo(token)]
  }

  static propTypes = {
    route: PropTypes.object.isRequired,
    history: PropTypes.object,
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    globalVal: PropTypes.object.isRequired,
    document: PropTypes.object,
  }

  componentWillMount() {

    if (!isLogin()) {
      try {
        window.location.href = '/login'
      } catch (err) {
        // console.log('忽略服务端渲染,组件检查的时候window is not defined')
      }

    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    // const { actions,showmsg } = this.props
    return (
      <Layout>
        <SiderBar collapsed={this.state.collapsed}/>
        <Layout>
          <Header style={{background: '#fff', padding: 0}}>

            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
            {renderRoutes(this.props.route.routes)}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>

    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout2))