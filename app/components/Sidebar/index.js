import React, {Component} from 'react'
import defaultAvatar from '../../assets/img/20625882.png'
import PropTypes from 'prop-types'
import * as Actions from '../../actions'
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


class Sidebar extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes={
    auth:PropTypes.object.isRequired,
  };


  render() {
    const {auth:{user}}=this.props
    return (
      <aside className="main-sidebar">
        {/* sidebar: style can be found in sidebar.less */}
        <section className="sidebar">
          {/* Sidebar user panel */}
          <div className="user-panel">
            <div className="pull-left image">
              <img src={(user ? user.avatar :'')|| defaultAvatar } className="img-circle" alt="User Image"/>
            </div>
            <div className="pull-left info">
              <p>{user ? user.username :''}</p>
              <a href="#"><i className="fa fa-circle text-success"></i> 在线</a>
            </div>
          </div>
          {/* search form */}
          <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input type="text" name="q" className="form-control" placeholder="搜索..."/>
              <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat">
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form>
          {/* /.search form */}
          {/* sidebar menu: : style can be found in sidebar.less */}
          <ul className="sidebar-menu">
            <li className="treeview">
              <a href="#">
                <i className="fa fa-dashboard"></i>
                <span>仪表盘</span>
                <i className="fa fa-angle-left pull-right"></i>
              </a>
              <ul className="treeview-menu">
                <li><a href="/panel/basicInfo"><i className="fa fa-circle-o"></i> 基本信息</a></li>
                <li><a href="/panel/modifyPwd"><i className="fa fa-circle-o"></i> 修改密码</a></li>
              </ul>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-files-o"></i>
                <span>用户管理</span>
                <i className="fa fa-angle-left pull-right"></i>
              </a>
              <ul className="treeview-menu">
                <li><a href="/userManage/allUserGroups"><i className="fa fa-circle-o"></i> 所有用户组</a></li>
                <li><a href="/userManage/addUserGroup"><i className="fa fa-circle-o"></i> 添加用户组</a></li>
                <li><a href="/userManage/allUsers"><i className="fa fa-circle-o"></i> 所有用户</a></li>
                <li><a href="/userManage/addUser"><i className="fa fa-circle-o"></i> 添加用户</a></li>
              </ul>
            </li>
            <li className="treeview">
              <a href="#"><i className="fa fa-sticky-note-o"></i><span>文档管理</span> <i
                className="fa fa-angle-left pull-right"></i></a>
              <ul className="treeview-menu">
                <li>
                  <a href="#"> 分类管理
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li><a href="/docManage/allCategories"> 所有分类</a></li>
                    <li><a href="/docManage/addCategory">添加分类</a></li>


                  </ul>
                </li>
                <li>
                  <a href="#"> 菜单管理
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li><a href="/documentManage/menuManage/editMenu">编辑菜单</a></li>
                    <li><a href="/documentManage/menuManage/menuLocation">菜单位置</a></li>

                  </ul>
                </li>
                <li><a href="/documentManage/tagsManage"> 标签管理</a></li>
                <li><a href="/documentManage/commentsManage"> 评论管理</a></li>
                <li><a href="/documentManage/messagesManage"> 消息管理</a></li>
                <li><a href="/documentManage/writeDocument">写文档</a></li>
                <li><a href="/documentManage/documentPublished">已发布</a></li>
                <li><a href="/documentManage/documentWaitForVerify">待审核</a></li>
                <li><a href="/documentManage/documentNoAccess">未通过</a></li>
                <li><a href="/documentManage/draft">草稿箱</a></li>
                <li><a href="/documentManage/recycleBin">回收站</a></li>


              </ul>
            </li>
            <li className="treeview">
              <a href="#"><i className="fa fa-file-photo-o"></i><span>文件管理</span> <i
                className="fa fa-angle-left pull-right"></i></a>
              <ul className="treeview-menu">
                <li><a href="/fileManage/uploadAvatar"> 头像上传</a></li>
                <li><a href="/fileManage/mediaManage"> 媒体管理</a></li>
                <li><a href="/fileManage/filesBackup"> 文件备份</a></li>
                <li><a href="/fileManage/filesRecover"> 文件恢复</a></li>
              </ul>
            </li>
            <li className="treeview">
              <a href="#"><i className="fa fa-database"></i><span>数据管理</span> <i
                className="fa fa-angle-left pull-right"></i></a>
              <ul className="treeview-menu">
                <li>
                  <a href="#"> 数据库管理
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li><a href="/dataManage/databaseManage/databaseBackup">数据库备份</a></li>
                    <li><a href="/dataManage/databaseManage/databaseImport">数据库导入</a></li>
                    <li><a href="/dataManage/databaseManage/databaseCompress">数据库压缩</a></li>
                    <li><a href="/dataManage/databaseManage/databaseoptimize">数据库优化</a></li>
                  </ul>
                </li>
                <li>
                  <a href="#"> 缓存管理
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li><a href="/dataManage/cacheManage/cacheClear">缓存清理</a></li>
                    <li><a href="/dataManage/cacheManage/cacheSettings">缓存设置</a></li>

                  </ul>
                </li>
                <li>
                  <a href="#"> 统计管理
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li><a href="/dataManage/statisticsManage/count">数据统计</a></li>


                  </ul>
                </li>

              </ul>
            </li>
            <li className="treeview">
              <a href="#"><i className="fa fa-window-maximize"></i><span>定制中心</span> <i
                className="fa fa-angle-left pull-right"></i></a>
              <ul className="treeview-menu">
                <li>
                  <a href="/customizationCenter/themeManage"> 主题管理</a>
                  <ul className="treeview-menu">
                    <li><a href="/customizationCenter/themeManage/installTheme">安装主题</a></li>
                    <li><a href="/customizationCenter/themeManage/localTheme">本地主题</a></li>
                    <li><a href="/customizationCenter/themeManage/editTemplate">模版编辑</a></li>
                  </ul>
                </li>
                <li><a href="/customizationCenter/pluginsManage"> 插件管理</a></li>
                <li><a href="/customizationCenter/hooksManage"> 钩子管理</a></li>
                <li><a href="/customizationCenter/adManage"> 广告管理</a></li>
              </ul>
            </li>
            <li className="treeview">
              <a href="#"><i className="fa fa-cog"></i><span>系统设置</span> <i
                className="fa fa-angle-left pull-right"></i></a>
              <ul className="treeview-menu">
                <li><a href="/systemSettings/systemLog"> 系统日志</a></li>
                <li><a href="/systemSettings/websiteSettings"> 站点设置</a></li>
                <li><a href="/systemSettings/readSettings"> 阅读设置</a></li>
                <li><a href="/systemSettings/attachmentSettings"> 附件设置</a></li>


                <li><a href="/systemSettings/socialLoginSettings"> 社交登录设置</a></li>
                <li><a href="/systemSettings/updateOnline"> 在线更新</a></li>
                <li><a href="/systemSettings/systemInfo"> 系统信息</a></li>
                <li><a href="/systemSettings/bugsFeedback"> BUG反馈</a></li>
              </ul>
            </li>

          </ul>
        </section>
        {/* /.sidebar */}
      </aside>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar)