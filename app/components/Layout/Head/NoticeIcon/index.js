import React, { PureComponent } from 'react'
import { Popover, Icon, Tabs, Badge, Spin } from 'antd'
import classNames from 'classnames'
import List from './NoticeList'
import styles from './index.less'
import PropTypes from 'prop-types'

const { TabPane } = Tabs

class NoticeIcon extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    if (props.children && props.children[0]) {
      this.state.tabType = props.children[0].props.title
    }
  }
  static defaultProps = {
    onItemClick: () => {},
    onPopupVisibleChange: () => {},
    onTabChange: () => {},
    onClear: () => {},
    loading: false,
    locale: {
      emptyText: '暂无数据',
      clear: '清空',
    },
    emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
  };
  static Tab = TabPane;

  static propTypes = {

    className: PropTypes.string,
    children: PropTypes.array,
    onItemClick: PropTypes.func,
    onTabChange: PropTypes.func,
    loading: PropTypes.bool,
    locale: PropTypes.object,
    onClear: PropTypes.func,
    count: PropTypes.func,
    popupAlign: PropTypes.func,
    onPopupVisibleChange: PropTypes.func,
    popupVisible: PropTypes.func,
  };

  onItemClick = (item, tabProps) => {
    const { onItemClick } = this.props
    onItemClick(item, tabProps)
  }
  onTabChange = (tabType) => {
    this.setState({ tabType })
    this.props.onTabChange(tabType)
  }
  getNotificationBox() {
    const { children, loading, locale } = this.props
    if (!children) {
      return null
    }
    const panes = React.Children.map(children, (child) => {
      const title = child.props.list && child.props.list.length > 0
        ? `${child.props.title} (${child.props.list.length})` : child.props.title
      return (
        <TabPane tab={title} key={child.props.title}>
          <List
            {...child.props}
            data={child.props.list}
            onClick={item => this.onItemClick(item, child.props)}
            onClear={() => this.props.onClear(child.props.title)}
            title={child.props.title}
            locale={locale}
          />
        </TabPane>
      )
    })
    return (
      <Spin spinning={loading} delay={0}>
        <Tabs className={styles.tabs} onChange={this.onTabChange}>
          {panes}
        </Tabs>
      </Spin>
    )
  }

  render() {
    const { className, count, popupAlign, onPopupVisibleChange } = this.props
    const noticeButtonClass = classNames(className, styles.noticeButton)
    const notificationBox = this.getNotificationBox()
    const trigger = (
      <span className={noticeButtonClass}>
        <Badge count={count} className={styles.badge}>
          <Icon type="bell" className={styles.icon} />
        </Badge>
      </span>
    )
    if (!notificationBox) {
      return trigger
    }
    const popoverProps = {}
    if ('popupVisible' in this.props) {
      popoverProps.visible = this.props.popupVisible
    }
    return (
      <Popover
        placement="bottomRight"
        content={notificationBox}
        popupClassName={styles.popover}
        trigger="click"
        arrowPointAtCenter
        popupAlign={popupAlign}
        onVisibleChange={onPopupVisibleChange}
        {...popoverProps}
      >
        {trigger}
      </Popover>
    )
  }
}

export default NoticeIcon
