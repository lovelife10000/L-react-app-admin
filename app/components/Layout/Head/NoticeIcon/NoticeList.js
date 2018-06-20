import React, { PureComponent } from 'react'
import { Avatar, List } from 'antd'
import classNames from 'classnames'
import styles from './NoticeList.less'
import PropTypes from 'prop-types'


class NoticeList extends PureComponent {
  constructor(props) {
    super(props)

  }


  static propTypes = {


    data: PropTypes.func,
    onClick: PropTypes.func,
    onClear: PropTypes.func,
    title: PropTypes.func,
    locale: PropTypes.object,
    emptyText: PropTypes.func,
    emptyImage: PropTypes.func,

  };



  render() {
    const data=[]
    const {onClick, onClear, title, locale, emptyText, emptyImage}=this.props
    if (data.length === 0) {
      return (
        <div className={styles.notFound}>
          {emptyImage ? (
            <img src={emptyImage} alt="not found" />
          ) : null}
          <div>{emptyText || locale.emptyText}</div>
        </div>
      )
    }
    return (
      <div>
        <List className={styles.list}>
          {data.map((item, i) => {
            const itemCls = classNames(styles.item, {
              [styles.read]: item.read,
            })
            return (
              <List.Item className={itemCls} key={item.key || i} onClick={() => onClick(item)}>
                <List.Item.Meta
                  className={styles.meta}
                  avatar={item.avatar ? <Avatar className={styles.avatar} src={item.avatar} /> : null}
                  title={
                    <div className={styles.title}>
                      {item.title}
                      <div className={styles.extra}>{item.extra}</div>
                    </div>
                  }
                  description={
                    <div>
                      <div className={styles.description} title={item.description}>
                        {item.description}
                      </div>
                      <div className={styles.datetime}>{item.datetime}</div>
                    </div>
                  }
                />
              </List.Item>
            )
          })}
        </List>
        <div className={styles.clear} onClick={onClear}>
          {locale.clear}{title}
        </div>
      </div>
    )
  }
}

export default NoticeList
