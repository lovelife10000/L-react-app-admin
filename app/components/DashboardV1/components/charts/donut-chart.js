import React, {Component} from 'react'
import PropTypes from 'prop-types'
class DonutChart extends Component {
  constructor() {
    super()
  }

  static defaultProps = {
    id: 'donut-chart-1',
    colors: ['#3c8dbc'],
    data: [
      {
        label: 'Donut piece', value: 40
      }
    ]
  };
  static propTypes = {
    id: PropTypes.string.isrequired,
    children: PropTypes.string.isrequired
  };
  // componentDidMount(){
  // var donut = new Morris.Donut({
  //   element: this.props.id,
  //   resize: true,
  //   colors: this.props.colors,
  //   data: this.props.data,
  //   hideHover: 'auto'
  // });
  // }
  render() {
    var style = {
      position: 'relative',
      height: '300px'
    };
    return (
      <div className="chart tab-pane active" id={this.props.id} style={style}>
        {this.props.children}
      </div>
    )
  }
}

export default DonutChart