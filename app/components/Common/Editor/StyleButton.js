import React, {Component} from 'react'
import PropTypes from 'prop-types'

const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    fontSize: 14,
    padding: 20,
    width: 600,
  },
  editor: {
    borderTop: '1px solid #ddd',
    cursor: 'text',
    fontSize: 16,
    marginTop: 20,
    minHeight: 400,
    paddingTop: 20,
  },
  controls: {
    fontFamily: '\'Helvetica\', sans-serif',
    fontSize: 14,
    marginBottom: 10,
    userSelect: 'none',
  },
  styleButton: {
    color: '#999',
    cursor: 'pointer',
    marginRight: 16,
    padding: '2px 0',
  },
}

class StyleButton extends Component {
  constructor() {
    super()
    this.onToggle = (e) => {
      e.preventDefault()
      this.props.onToggle(this.props.style)
    }
  }

  static propTypes = {
    active: PropTypes.bool,
    label: PropTypes.object,

    style: PropTypes.object,
    onToggle: PropTypes.func,
  };


  render() {
    const colorStyleMap = {
      red: {
        color: 'rgba(255, 0, 0, 1.0)',
      },

    }
    let style
    if (this.props.active) {
      style = {...styles.styleButton, ...colorStyleMap[this.props.style]}
    } else {
      style = styles.styleButton
    }

    return (


      <span style={style} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>


    )
  }

}

export default StyleButton
