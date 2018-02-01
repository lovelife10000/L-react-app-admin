import React, {Component} from 'react'

class Footer extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <footer className="main-footer">
        <div className="pull-right hidden-xs">
          <b>Version</b> 1.0.0
        </div>
        <strong>Copyright 2017 - 2018 lovelife10000. All Rights Reserved</strong>
      </footer>
    )
  }
}
export default Footer