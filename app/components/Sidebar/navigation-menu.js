import React, {Component} from 'react'
// import defaultAvatar from '../../../dist/img/20625882.png'

class Sidebar extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <aside className="main-sidebar">
        {/* sidebar: style can be found in sidebar.less */}
        <section className="sidebar">
          {/* Sidebar user panel */}
          <div className="user-panel">
            <div className="pull-left image">
              <img src={ 'defaultAvatar' } className="img-circle" alt="User Image"/>
            </div>
            <div className="pull-left info">
              <p>Kevin</p>
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
                <li><a href="./panel"><i className="fa fa-circle-o"></i> 基本信息</a></li>
                <li><a href="index2.html"><i className="fa fa-circle-o"></i> 修改密码</a></li>
              </ul>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-files-o"></i>
                <span>用户管理</span>
                <i className="fa fa-angle-left pull-right"></i>
              </a>
              <ul className="treeview-menu">
                <li><a href="/allUserGroups"><i className="fa fa-circle-o"></i> 所有用户组</a></li>
                <li><a href="/addUserGroup"><i className="fa fa-circle-o"></i> 添加用户组</a></li>
                <li><a href="pages/layout/collapsed-sidebar.html"><i className="fa fa-circle-o"></i> 所有用户</a></li>
                <li><a href="pages/layout/top-nav.html"><i className="fa fa-circle-o"></i> 添加用户</a></li>
              </ul>
            </li>
            <li>
              <a href="pages/widgets.html">
                <i className="fa fa-th"></i>
                <span>文档管理</span>
                <i className="fa fa-angle-left pull-right"></i>
              </a>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-pie-chart"></i>
                <span>文件管理</span>
                <i className="fa fa-angle-left pull-right"></i>
              </a>
              <ul className="treeview-menu">
                <li><a href="pages/charts/chartjs.html"><i className="fa fa-circle-o"></i> 媒体管理</a></li>
                <li><a href="pages/charts/morris.html"><i className="fa fa-circle-o"></i> 文件备份</a></li>
                <li><a href="pages/charts/flot.html"><i className="fa fa-circle-o"></i> 文件恢复</a></li>
              </ul>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-laptop"></i>
                <span>数据管理</span>
                <i className="fa fa-angle-left pull-right"></i>
              </a>
              <ul className="treeview-menu">
                <li><a href="pages/UI/general.html"><i className="fa fa-circle-o"></i> 数据库备份</a></li>
                <li><a href="pages/UI/icons.html"><i className="fa fa-circle-o"></i> 数据库导入</a></li>
                <li><a href="pages/UI/buttons.html"><i className="fa fa-circle-o"></i> 数据库压缩</a></li>
                <li><a href="pages/UI/sliders.html"><i className="fa fa-circle-o"></i> 数据库优化</a></li>
                <li><a href="pages/UI/timeline.html"><i className="fa fa-circle-o"></i> 缓存管理</a></li>
                <li><a href="pages/UI/modals.html"><i className="fa fa-circle-o"></i> 缓存清理</a></li>
              </ul>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-edit"></i> <span>定制中心</span>
                <i className="fa fa-angle-left pull-right"></i>
              </a>
              <ul className="treeview-menu">
                <li><a href="pages/forms/general.html"><i className="fa fa-circle-o"></i> 主题管理</a></li>
                <li><a href="pages/forms/advanced.html"><i className="fa fa-circle-o"></i> 安装主题</a></li>
                <li><a href="pages/forms/editors.html"><i className="fa fa-circle-o"></i> 本地主题</a></li>
              </ul>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-table"></i> <span>系统设置</span>
                <i className="fa fa-angle-left pull-right"></i>
              </a>
              <ul className="treeview-menu">
                <li><a href="pages/tables/simple.html"><i className="fa fa-circle-o"></i> 系统日志</a></li>
                <li><a href="pages/tables/data.html"><i className="fa fa-circle-o"></i> 站点设置</a></li>
              </ul>
            </li>

          </ul>
        </section>
        {/* /.sidebar */}
      </aside>
    )
  }
}

export default Sidebar