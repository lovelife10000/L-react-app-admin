import React, {Component} from 'react'
import {Slider, Icon} from 'antd'
import PropTypes from 'prop-types'

class IconSlider extends Component {
  constructor() {
    super()
    // this.handleChange=this.handleChange.bind(this)
    this.state = {
      value: 0,
    }
  }
  static propTypes={
    min:PropTypes.number.isRequired,
    max:PropTypes.number.isRequired,
    getSliderVal:PropTypes.func
  };

  handleChange = (value) => {
    this.setState({
      value:value
    })
    this.props.getSliderVal(value)
  }

  render() {
    const {max, min} = this.props
    const {value} = this.state
    const mid = ((max - min) / 2).toFixed(5)
    const preColor = value >= mid ? '' : 'rgba(0, 0, 0, .45)'
    const nextColor = value >= mid ? 'rgba(0, 0, 0, .45)' : ''

    return (


      <div className="icon-wrapper">
        <Icon style={{color: preColor}} type="frown-o"/>
        <Slider {...this.props} onChange={this.handleChange} step={0.01}  value={value}/>
        <Icon style={{color: nextColor}} type="smile-o"/>
      </div>


    )
  }

}

export default IconSlider
