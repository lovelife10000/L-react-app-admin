import React, {Component} from 'react';
import {Breadcrumb} from 'antd';

import PropTypes from 'prop-types'
import * as Actions from 'actions'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './index.less';


const mapStateToProps = state => {
    return {
        allUserGroups: state.allUserGroups.toJS()
    }
};
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
};


class BreadcrumbComp extends Component {
    constructor(props) {
        debugger
        super(props)
        this.state = {
            abc: ''
        }

    }

    static propTypes = {
        allUserGroups: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        category: PropTypes.string.isRequired,
        item: PropTypes.string.isRequired,
    };

    componentWillMount() {
        console.log('bread')
        debugger
    }

    UNSAFE_componentWillMount() {
        console.log('bread')
        debugger
    }

    // static getDerivedStateFromProps() {
    //     debugger
    // }

    componentDidMount() {
        console.log('bread')
        debugger

    }


    componentWillUpdate() {
        console.log('bread')
        debugger
    }

    UNSAVE_componentWillUpdate() {
        console.log('bread')
        debugger
    }

    // componentWillReceiveProps() {
    //     debugger
    // }
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('bread')
        debugger
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('bread')
        debugger
        return true

    }

    // getSnapshotBeforeUpdate() {
    //     debugger
    // }

    componentDidUpdate() {
        console.log('bread')
        debugger
    }

    componentWillUnmount() {
        console.log('bread')
        debugger
    }

    componentDidCatch() {
        console.log('bread')
        debugger
    }

    setState2() {
        console.log('bread')
        debugger
        this.setState({
            abc: 666
        })
    }

    render() {
        console.log('bread')
        debugger

        return (
            <Breadcrumb className={styles.breadcrumb} separator=">">
                <Breadcrumb.Item>主页</Breadcrumb.Item>
                <Breadcrumb.Item>{this.props.category}</Breadcrumb.Item>
                <Breadcrumb.Item>{this.props.item}</Breadcrumb.Item>
                <input type="text" onChange={this.props.func}/>
            </Breadcrumb>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BreadcrumbComp))