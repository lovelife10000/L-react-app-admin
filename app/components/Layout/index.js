import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as Actions from '../../actions'
import Head from './Head'
import {renderRoutes} from 'react-router-config'
import {isLogin} from '../../utils/auth.util'
import {Layout} from 'antd';
const {Content, Footer} = Layout;
import Sider from './Side'




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


  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
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
        <Sider collapsed={this.state.collapsed}/>
        <Layout>
          <Head
          />
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
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