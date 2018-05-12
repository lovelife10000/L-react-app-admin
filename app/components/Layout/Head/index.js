import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux'
import * as Actions from 'actions'
import {connect} from 'react-redux'
import {Layout, Tooltip, Icon, Tag, Menu, Dropdown, Avatar, Divider, Modal} from 'antd';

const confirm = Modal.confirm;
import CollapsedBtn from './CollapsedBtn'
import moment from 'moment';
import {Link} from 'react-router-dom'

const {Header} = Layout;
import groupBy from 'lodash/groupBy';
import styles from './index.less'
import HeaderSearch from './HeaderSearch'
import NoticeIcon from './NoticeIcon'
import defaultAvatar from 'assets/img/20625882.png'

const mapStateToProps = (state) => {
    return {
        auth: state.auth.toJS()
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
};

class HeaderBar extends Component {
    constructor(props) {
        super(props)

    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        onNoticeClear: PropTypes.func,
        onNoticeVisibleChange: PropTypes.func,
        fetchingNotices: PropTypes.func,
        noticeData: PropTypes.func,
        notices: PropTypes.array,
        onMenuClick: PropTypes.func,
        collapsed: PropTypes.bool,
        isMobile: PropTypes.bool,
        logo: PropTypes.string,
        onToggle: PropTypes.func,
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


    onMenuClick = ({key}) => {
        const {actions} = this.props

        if (key === 'logout') {

            confirm({
                title: '是否要退出登录状态?',
                content: '退出后需要重新登录',
                onOk() {

                    actions.logout()

                },
                onCancel() {

                },
            });
        }
    };

    render() {
        const {
            collapsed, isMobile, logo, onToggle, auth: {user}
        } = this.props;


        const menu = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
                <Menu.Item disabled><Icon type="user"/>个人中心</Menu.Item>
                <Menu.Item><Link to="/fileManage/uploadAvatar"><Icon type="setting"/>上传头像</Link></Menu.Item>
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
                                    <img src={user ? user.avatar : defaultAvatar} alt="logo" width="32"/>
                                </Link>
                            ),
                            <Divider type="vertical" key="line"/>,
                        ]
                    )}
                    <CollapsedBtn collapsed={collapsed} onToggle={onToggle}/>
                    <div className={styles.right}>
                        <HeaderSearch className={`${styles.action} ${styles.search}`}/>
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
                  <Avatar size="small" className={styles.avatar} src={(user ? user.avatar : '') || defaultAvatar}/>
                  <span className={styles.name}>{user ? user.username : ''}</span>
                </span>
                                </Dropdown>
                            ) :
                            <Dropdown overlay={menu}>
                <span className={`${styles.action} ${styles.account}`}>
                  <Avatar size="small" className={styles.avatar} src={(user ? user.avatar : '') || defaultAvatar}/>
                  <span className={styles.name}>{user ? user.username : ''}</span>
                </span>
                            </Dropdown>
                        }
                    </div>
                </div>

            </Header>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar)
