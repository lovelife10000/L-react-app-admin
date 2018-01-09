import React, {Component} from 'react'
import PropTypes from 'prop-types'

class TaskItem extends Component {
  constructor() {
    super()

  }
  static propTypes={
    percentage:PropTypes.string.isRequired,
    theme:PropTypes.string.isRequired,
    content:PropTypes.string.isRequired
  }


  render() {
    var stylePercentage = {
      width: this.props.percentage + '%'
    };
    return (
      <li>
        <a href="#">
          <h3>
            {this.props.content}
            <small className="pull-right">{this.props.percentage + '%'}</small>
          </h3>
          <div className="progress xs">
            <div className={'progress-bar ' + this.props.theme} style={stylePercentage}>
              <span className="sr-only">{this.props.percentage + '% Complete'} </span>
            </div>
          </div>
        </a>
      </li>
    )
  }
}
export default TaskItem