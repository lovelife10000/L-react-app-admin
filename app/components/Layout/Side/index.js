import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Layout, Menu, Icon} from 'antd';
const {SubMenu} = Menu;
const {Sider} = Layout;
import {Link} from 'react-router-dom'
import defaultAvatar from 'assets/img/20625882.png'
import styles from './index.less'
import * as Actions from 'actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import 'rc-drawer-menu/assets/index.css';
import DrawerMenu from 'rc-drawer-menu';
import appConfig from 'config/app'

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


class Side extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        collapsed: PropTypes.bool,
        auth: PropTypes.object.isRequired,
        onCollapse: PropTypes.func,
        isMobile: PropTypes.bool,
    };


    render() {

        const {auth: {user}, onCollapse} = this.props

        const sid = () => (<Sider
            trigger={null}
            collapsed={this.props.isMobile ? false : this.props.collapsed}
            width={256}
            breakpoint="lg"
            onCollapse={onCollapse}
            className={styles.sider}
        >
            <div className={styles.logo} key="logo">
                <Link to='/'>
                    <img src={user ? user.avatar : defaultAvatar} alt="logo"/>
                    <h1>L-react-app-admin</h1>
                </Link>
            </div>

            <Menu theme="dark" mode="inline" >
                {appConfig.side.map((item, index) => {
                    return (
                        <SubMenu key={'sub1_'+index} title={<span><Icon type={item.icon}/><span>{item.name}</span></span>}>
                            {
                                item.children.length > 0
                                &&
                                item.children.map((item2, index2) => {
                                    if (item2.children.length < 1) {
                                        return (
                                            <Menu.Item key={'sub2_'+index2}><a href={item2.url}>{item2.name}</a></Menu.Item>
                                        )
                                    } else {
                                        return (
                                            <SubMenu key={index2} title={<span>{item2.name}</span>}>
                                                {item2.children.map((item3, index3) => {
                                                    return (
                                                        <Menu.Item key={'sub3_'+index3}><a
                                                            href={item3.url}>{item3.name}</a></Menu.Item>


                                                    )
                                                })}
                                            </SubMenu>
                                        )


                                    }

                                })


                            }

                        </SubMenu>
                    )
                })}
            </Menu>

        </Sider>)
        return (
            this.props.isMobile ? (
                <DrawerMenu
                    parent={null}
                    level={null}
                    iconChild={null}
                    open={this.props.collapsed}
                    onMaskClick={() => {
                        this.props.onCollapse(true);
                    }}
                    width="256px"

                >

                    {sid()}
                </DrawerMenu>
            ) : sid()


        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Side)