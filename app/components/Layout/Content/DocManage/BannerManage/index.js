import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as Actions from 'actions'

import {renderRoutes} from 'react-router-config'
import {isLogin} from 'utils/auth.util'
import {Layout,LocaleProvider} from 'antd';
const {Content, Footer} = Layout;





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

        return (
          <div>66</div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BannerManage))