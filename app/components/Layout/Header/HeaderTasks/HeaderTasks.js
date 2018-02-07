import React, {Component} from 'react'
import TaskItem from './TaskItem'

class HeaderTasks extends Component {
  constructor() {
    super()
    this.state = {
      tasks: []
    }
  }


  componentDidMount() {

    var tasks = [{
      subject: 'Design some buttons',
      percentage: 20
    }, {
      subject: 'Create a nice theme',
      percentage: 40
    }, {
      subject: 'Some task I need to do',
      percentage: 60
    }, {
      subject: 'Make beautiful transitions',
      percentage: 80
    }];

    this.setState({
      tasks: tasks
    });
  }

  render() {
    var progressBarColor;

    var taskList = this.state.tasks.map(function (taskDetails, iterator) {

      if (taskDetails.percentage < 21) {
        progressBarColor = 'progress-bar-red'
      } else if (taskDetails.percentage > 20 && taskDetails.percentage < 41) {
        progressBarColor = 'progress-bar-yellow'
      } else if (taskDetails.percentage > 40 && taskDetails.percentage < 61) {
        progressBarColor = 'progress-bar-green'
      } else if (taskDetails.percentage > 60) {
        progressBarColor = 'progress-bar-aqua';
      }

      return (
        <TaskItem
          key={iterator}
          percentage={taskDetails.percentage}
          content={taskDetails.content}
          theme={progressBarColor}/>
      )
    });
    return (
      <li className="dropdown tasks-menu">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-flag-o"></i>
          <span className="label label-danger">{this.state.tasks.length}</span>
        </a>
        <ul className="dropdown-menu">
          <li className="header">你有 {this.state.tasks.length} 项任务</li>
          <li>
            {/* inner menu: contains the actual data */}
            <div className="slimScrollDiv">

              <ul className="menu">
                {taskList}
              </ul>

              <div className="slimScrollBar"></div>
              <div className="slimScrollRail"></div>
            </div>
          </li>
          <li className="footer">
            <a href="#">查看所有任务</a>
          </li>
        </ul>
      </li>
    )
  }
}
export default HeaderTasks