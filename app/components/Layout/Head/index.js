import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux'
import * as Actions from '../../../actions'
import {connect} from 'react-redux'
import {Layout, Tooltip, Icon, Tag, Menu, Dropdown,Avatar,Spin,Divider,} from 'antd';
import CollapsedBtn from './CollapsedBtn'
import moment from 'moment';
import {Link} from 'react-router-dom'
const {Header} = Layout;
import groupBy from 'lodash/groupBy';
import styles from './index.less'
import HeaderSearch from './HeaderSearch'
import NoticeIcon from './NoticeIcon'


const mapStateToProps = (state) => {
  return {
    auth: state.auth.toJS()
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(dispatch, Actions)
  }
};

class HeaderBar extends Component {
  constructor(props) {
    super(props)

  }

  static propTypes = {

    onNoticeClear: PropTypes.func,
    onNoticeVisibleChange: PropTypes.func,
    fetchingNotices: PropTypes.func,
    noticeData: PropTypes.func,
    notices: PropTypes.array,
    onMenuClick: PropTypes.func,
    collapsed: PropTypes.bool,
    isMobile: PropTypes.bool,
    logo: PropTypes.string,
  };

  getNoticeData() {
    const {notices = []} = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map((notice) => {
      const newNotice = {...notice};
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = ({
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        })[newNotice.status];
        newNotice.extra = <Tag color={color} style={{marginRight: 0}}>{newNotice.extra}</Tag>;
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  render() {
    const {
      collapsed, isMobile, logo,       onMenuClick,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item disabled><Icon type="user"/>个人中心</Menu.Item>
        <Menu.Item disabled><Icon type="setting"/>设置</Menu.Item>
        <Menu.Item key="triggerError"><Icon type="close-circle"/>触发报错</Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="logout"><Icon type="logout"/>退出登录</Menu.Item>
      </Menu>
    );

    return (
      <Header style={{padding: 0}}>
        <div className={styles.header}>
          {isMobile && (
            [
              (
                <Link to="/" className={styles.logo} key="logo">
                  <img src={logo} alt="logo" width="32" />
                </Link>
              ),
              <Divider type="vertical" key="line" />,
            ]
          )}
          <CollapsedBtn collapsed={collapsed}/>
          <div className={styles.right}>
            <HeaderSearch/>
            <Tooltip title="使用文档">
              <a
                target="_blank"
                href="http://pro.ant.design/docs/getting-started"
                rel="noopener noreferrer"
                className={styles.action}
              >
                <Icon type="question-circle-o"/>
              </a>
            </Tooltip>
            <NoticeIcon
              className={styles.action}

            >
              <NoticeIcon.Tab

              />
              <NoticeIcon.Tab

              />
              <NoticeIcon.Tab

              />
            </NoticeIcon>
            {isMobile ? (
              <Dropdown overlay={menu}>
                <span className={`${styles.action} ${styles.account}`}>
                  <Avatar size="small" className={styles.avatar} src={'777'}/>
                  <span className={styles.name}>{999}</span>
                </span>
              </Dropdown>
            ) : <Spin size="small" style={{marginLeft: 8}}/>}
          </div>
        </div>

      </Header>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar)
