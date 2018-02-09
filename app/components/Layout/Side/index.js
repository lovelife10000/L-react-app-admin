import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Layout, Menu, Icon} from 'antd';
const { SubMenu } = Menu;
const { Sider} = Layout;
import {Link} from 'react-router-dom'
import defaultAvatar from '../../../assets/img/20625882.png'
import styles from './index.less'
import * as Actions from '../../../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

const mapStateToProps=(state)=>{
  return{
    auth:state.auth.toJS()
  }
};

const mapDispatchToProps=(dispatch)=>{
  return{
    actions:bindActionCreators(dispatch,Actions)
  }
};


class Side extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes={
    collapsed:PropTypes.bool,
    auth:PropTypes.object.isRequired,
    onCollapse:PropTypes.func,
  };


  render() {
    const {auth:{user},onCollapse}=this.props
    return (

      <Sider
        trigger={null}
        // collapsible={false}
        collapsed={this.props.collapsed}
        width={256}
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={onCollapse}
        className={styles.sider}
      >
        <div className={styles.logo} key="logo">
          <Link to='/'>
            <img src={(user ? user.avatar :'')|| defaultAvatar } alt="logo" />
            <h1>L-react-app-admin</h1>
          </Link>
        </div>


        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>


          <SubMenu key="sub1" title={<span><Icon type="user" /><span>仪表盘</span></span>}>
            <Menu.Item key="1"><a href="/panel/basicInfo">基本信息</a></Menu.Item>
            <Menu.Item key="2"><a href="/panel/modifyPwd">修改密码</a></Menu.Item>
          </SubMenu>


          <SubMenu key="sub2" title={<span><Icon type="user" /><span>用户管理</span></span>}>
            <Menu.Item key="1"><a href="/userManage/allUserGroups">所有用户组</a></Menu.Item>
            <Menu.Item key="2"><a href="/userManage/addUserGroup">添加用户组</a></Menu.Item>
            <Menu.Item key="3"><a href="/userManage/allUsers">所有用户</a></Menu.Item>
            <Menu.Item key="4"><a href="/userManage/addUser">添加用户</a></Menu.Item>
          </SubMenu>


          <SubMenu key="sub3" title={<span><Icon type="user" /><span>文档管理</span></span>}>

            <SubMenu key="sub3_1" title={<span>分类管理</span>}>
              <Menu.Item key="1"><a href="/docManage/allCategories">所有分类</a></Menu.Item>
              <Menu.Item key="2"><a href="/docManage/addCategory">添加分类</a></Menu.Item>
            </SubMenu>

            <SubMenu key="sub3_2" title={<span>菜单管理</span>}>
              <Menu.Item key="1"><a href="/documentManage/menuManage/editMenu">编辑菜单</a></Menu.Item>
              <Menu.Item key="2"><a href="/documentManage/menuManage/menuLocation">菜单位置</a></Menu.Item>
            </SubMenu>

            <SubMenu key="sub3_3" title={<span>标签管理</span>}>
              <Menu.Item key="1"><a href="/documentManage/commentsManage">评论管理</a></Menu.Item>
              <Menu.Item key="2"><a href="/documentManage/messagesManage">消息管理</a></Menu.Item>
            </SubMenu>

            <SubMenu key="sub3_4" title={<span>文档管理</span>}>
              <Menu.Item key="1"><a href="/docManage/addDoc">添加文档</a></Menu.Item>
              <Menu.Item key="2"><a href="/docManage/allDocs">所有文档</a></Menu.Item>
            </SubMenu>

          </SubMenu>


          <SubMenu key="sub4" title={<span><Icon type="user" /><span>文件管理</span></span>}>
            <Menu.Item key="1"><a href="/fileManage/uploadAvatar">头像上传</a></Menu.Item>
            <Menu.Item key="2"><a href="/fileManage/mediaManage">媒体管理</a></Menu.Item>
            <Menu.Item key="3"><a href="/fileManage/filesBackup">文件备份</a></Menu.Item>
            <Menu.Item key="4"><a href="/fileManage/filesRecover">文件恢复</a></Menu.Item>
          </SubMenu>


          <SubMenu key="sub5" title={<span><Icon type="user" /><span>数据管理</span></span>}>

            <SubMenu key="sub5_1" title={<span>数据库管理</span>}>
              <Menu.Item key="1"><a href="/dataManage/databaseManage/databaseBackup">数据库备份</a></Menu.Item>
              <Menu.Item key="2"><a href="/dataManage/databaseManage/databaseImport">数据库导入</a></Menu.Item>
              <Menu.Item key="3"><a href="/dataManage/databaseManage/databaseCompress">数据库压缩</a></Menu.Item>
              <Menu.Item key="4"><a href="/dataManage/databaseManage/databaseoptimize">数据库优化</a></Menu.Item>
            </SubMenu>

            <SubMenu key="sub5_2" title={<span>缓存管理</span>}>
              <Menu.Item key="1"><a href="/dataManage/cacheManage/cacheClear">缓存清理</a></Menu.Item>
              <Menu.Item key="2"><a href="/dataManage/cacheManage/cacheSettings">缓存设置</a></Menu.Item>
            </SubMenu>

            <SubMenu key="sub5_3" title={<span>统计管理</span>}>
              <Menu.Item key="1"><a href="/dataManage/statisticsManage/count">数据统计</a></Menu.Item>

            </SubMenu>

          </SubMenu>


          <SubMenu key="sub6" title={<span><Icon type="user" /><span>定制中心</span></span>}>

            <SubMenu key="sub6_1" title={<span>主题管理</span>}>
              <Menu.Item key="1"><a href="/customizationCenter/themeManage/installTheme">安装主题</a></Menu.Item>
              <Menu.Item key="2"><a href="/customizationCenter/themeManage/localTheme">本地主题</a></Menu.Item>
              <Menu.Item key="3"><a href="/customizationCenter/themeManage/editTemplate">模版编辑</a></Menu.Item>
            </SubMenu>

            <Menu.Item key="sub6_2"><a href="/customizationCenter/pluginsManage">插件管理</a></Menu.Item>
            <Menu.Item key="sub6_3"><a href="/customizationCenter/hooksManage">钩子管理</a></Menu.Item>
            <Menu.Item key="sub6_4"><a href="/customizationCenter/adManage">广告管理</a></Menu.Item>

          </SubMenu>


          <SubMenu key="sub7" title={<span><Icon type="user" /><span>系统设置</span></span>}>

            <Menu.Item key="1"><a href="/systemSettings/systemLog">系统日志</a></Menu.Item>
            <Menu.Item key="2"><a href="/systemSettings/websiteSettings">站点设置</a></Menu.Item>
            <Menu.Item key="3"><a href="/systemSettings/readSettings">阅读设置</a></Menu.Item>
            <Menu.Item key="4"><a href="/systemSettings/attachmentSettings">附件设置</a></Menu.Item>

            <Menu.Item key="5"><a href="/systemSettings/socialLoginSettings">社交登录设置</a></Menu.Item>
            <Menu.Item key="6"><a href="/systemSettings/updateOnline">在线更新</a></Menu.Item>
            <Menu.Item key="7"><a href="/systemSettings/systemInfo">系统信息</a></Menu.Item>
            <Menu.Item key="8"><a href="/systemSettings/bugsFeedback">BUG反馈</a></Menu.Item>

          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Side)