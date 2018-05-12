import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styles from './index.less';
import * as Actions from 'actions'
import {isLogin} from 'utils/auth'
import {Card, Icon, Avatar, List, Button} from 'antd';
const {Meta} = Card;
import BreadcrumbComp from 'components/Common/BreadcrumbComp'
import AppConfig from 'config/app'


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


class BannerManage extends Component {
    constructor(props) {
        super(props)

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


    }

    componentWillMount() {


    }


    render() {
        const data = [
           null,
            {
                title: 'Title 1',
                url: 'Title 1',
            },
            {
                title: 'Title 2',
                url: 'Title 1',
            },
            {
                title: 'Title 3',
                url: 'Title 1',
            },
            {
                title: 'Title 4',
                url: 'Title 1',
            },
            {
                title: 'Title 5',
                url: 'Title 1',
            },
            {
                title: 'Title 6',
                url: 'Title 1',
            },
        ];
        return (
            <div className={styles.standardTable}>
                <BreadcrumbComp category={AppConfig.docManage[1]} item={AppConfig.bannerManage[1]}/>

                <List
                    grid={{gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3}}
                    dataSource={data}
                    renderItem={(item) =>

                        item ?



                            (

                                <List.Item>
                                    <Card
                                        style={{}}
                                        cover={<img alt="example" style={{height:'188px',width:'100%'}}
                                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
                                        actions={[<Icon type="edit">编辑</Icon>, <Icon type="edit">删除</Icon>]}
                                    >
                                        <Meta

                                            title={item.title}

                                        />
                                    </Card>
                                </List.Item>)
                            :
                             (

                                <List.Item>
                                    <Button type="dashed" className={styles.newButton}>
                                        <Icon type="plus"/> 新增轮播
                                    </Button>
                                </List.Item>
                            )


                    }
                />

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BannerManage)