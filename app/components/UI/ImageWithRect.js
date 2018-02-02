import React,{Component} from 'react'


import PropTypes from 'prop-types'

class ImageWithRect extends Component {
  static propTypes={
    rect:PropTypes.object,
    width:PropTypes.object,
    height:PropTypes.object,
    image:PropTypes.object,
    style:PropTypes.object,
  };

  componentDidMount () {
    this.redraw()
  }

  componentDidUpdate () {
    this.redraw()
  }

  setCanvas = (canvas) => {
    if (canvas) this.canvas = canvas
  }

  handleImageLoad = () => {
    const ctx = this.canvas.getContext('2d')
    const { rect, width, height } = this.props

    ctx.clearRect(0, 0, width, height)

    ctx.strokeStyle = 'red'

    if (rect && (rect.width > 1 || rect.height > 1)) {
      ctx.drawImage(
        this.imgElement,
        Math.round(-rect.x * (width / rect.width)),
        Math.round(-rect.y * (height / rect.height)),
        Math.round(width / rect.width),
        Math.round(height / rect.height)
      )

      if (rect) {
        ctx.strokeRect(1, 1, Math.round(width) - 2, Math.round(height) - 2)
      }
    } else {
      ctx.drawImage(this.imgElement, 0, 0, width, height)

      if (rect) {
        ctx.strokeRect(
          Math.round(rect.x * width) + 0.5,
          Math.round(rect.y * height) + 0.5,
          Math.round(rect.width * width),
          Math.round(rect.height * height)
        )
      }
    }
  }

  redraw () {
    const img = new Image()

    img.src = this.props.image
    img.onload = this.handleImageLoad
    this.imgElement = img
  }

  render () {
    return (
      <canvas
        ref={this.setCanvas}
        style={this.props.style}
        width={this.props.width}
        height={this.props.height}
      />
    )
  }
}

export default ImageWithRect