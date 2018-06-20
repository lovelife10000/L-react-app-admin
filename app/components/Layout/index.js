import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as Actions from 'actions'
import Head from './Head'
import { renderRoutes } from 'react-router-config'
import { isLogin } from 'utils/auth'
import { Layout, LocaleProvider } from 'antd'
const { Content, Footer } = Layout
import Side from './Side'
import zhCN from 'antd/lib/locale-provider/zh_CN'


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

console.log('类外面')
class LayoutComp extends Component {
  constructor(props) {
    console.log('constructor')
    super(props)
    this.state = {
      collapsed: false,
      isMobile: false
    }
  }




    static propTypes = {
      route: PropTypes.object.isRequired,
      history: PropTypes.object,
      auth: PropTypes.object.isRequired,
      actions: PropTypes.object.isRequired,
      globalVal: PropTypes.object.isRequired,
      document: PropTypes.object,
      collapsed: PropTypes.bool
    }

    componentDidMount() {
      console.log('componentDidMount')
      let enquireJs
      if (typeof window !== 'undefined') {
        const matchMediaPolyfill = mediaQuery => {
          return {
            media: mediaQuery,
            matches: false,
            addListener() {
            },
            removeListener() {
            },
          }
        }
        window.matchMedia = window.matchMedia || matchMediaPolyfill
        enquireJs = require('enquire.js')
      }

      enquireJs.register('only screen and (max-width: 767.99px)', {
        match: () => {
          this.setState({
            isMobile: true
          })
        },
        unmatch: () => {
          this.setState({
            isMobile: false
          })
        },
      })

      const { actions } = this.props
      actions.getUserInfo()
    }

    componentWillMount() {
      console.log('componentWillMount')
      if (!isLogin()) {
        try {
          this.props.history.replace('/login')
        } catch (err) {
          // console.log('忽略服务端渲染,组件检查的时候window is not defined')
        }

      }
    }

    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      })
    }

    static fetchData({ token }) {

      return [Actions.getUserInfo(token)]
    }

    handleMenuCollapse = (collapsed) => {
      this.props.actions.handleMenuCollapse(collapsed)
    }


    render() {
      console.log('render')
      return (
        <LocaleProvider locale={zhCN}>
          <Layout>
            <Side
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.toggle}
              isMobile={this.state.isMobile}
            />
            <Layout>
              <Head
                onToggle={this.toggle}
                isMobile={this.state.isMobile}
                collapsed={this.state.collapsed}

              />
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                {renderRoutes(this.props.route.routes)}
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                            L-react-app-admin ©2018 Created by lovelife10000 github:<a
                  href="https://github.com/lovelife10000/L-react-app-admin">https://github.com/lovelife10000/L-react-app-admin</a>
              </Footer>
            </Layout>
          </Layout>
        </LocaleProvider>
      )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutComp))