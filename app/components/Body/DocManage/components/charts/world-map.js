import React, {Component} from 'react'
import PropTypes from 'prop-types'

class WorldMap extends Component {
  constructor() {
    super()
  }

  static defaultProps = {
    id: 'world-map-1',
  };

  // componentDidMount() {
  //
  //   var visitorsData = this.props.info;
  //   $('#' + this.props.id).vectorMap({
  //     map: 'world_mill_en',
  //     backgroundColor: "transparent",
  //     regionStyle: {
  //       initial: {
  //         fill: '#e4e4e4',
  //         "fill-opacity": 1,
  //         stroke: 'none',
  //         "stroke-width": 0,
  //         "stroke-opacity": 1
  //       }
  //     },
  //     series: {
  //       regions: [{
  //         values: visitorsData,
  //         scale: ["#92c1dc", "#ebf4f9"],
  //         normalizeFunction: 'polynomial'
  //       }]
  //     },
  //     onRegionLabelShow: function (e, el, code) {
  //       if (typeof visitorsData[code] != "undefined")
  //         el.html(el.html() + ': ' + visitorsData[code] + ' new visitors');
  //     }
  //   });
  // }
  static propTypes = {
    id: PropTypes.string.isRequired
  };
  render() {
    var style = {
      height: '250px'
    };
    return (
      <div id={this.props.id} style={style}>

      </div>
    )
  }
}
export default WorldMap