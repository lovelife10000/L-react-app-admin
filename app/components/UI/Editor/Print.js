import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {SketchPicker} from 'react-color';
import reactCSS from 'reactcss'

class ColorControl extends Component {
  constructor() {
    super()
    this.state = {
      displayColorPicker: false,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
      color2:{
        hex:'#000',
        rgb:{
          color:'rgb(0,0,0,100)'
        }
      }
    };
    this.onToggle = (e) => {
      if(e){
        e.preventDefault();
      }
      console.log('完成',this.state.color2.hex)
      this.props.onToggle(this.state.color2.hex,this.state.color2.rgb);

    };
  }

  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onToggle: PropTypes.func,
  };


  handleClick = (e) => {
    e.preventDefault();
    this.setState({displayColorPicker: !this.state.displayColorPicker})
  };

  handleClose = (e) => {
    e.preventDefault();

    this.setState({displayColorPicker: false})
  };

  handleChange = (color,e) => {
    e.preventDefault();
    this.setState({color: color.rgb})
  };

  handleChangeComplete = (color) => {

    this.setState({ color2: {hex:color.hex,rgb:color.rgb} },function () {
      this.onToggle()
    });

  };



  render() {
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
        icon:{
          width:'18px',
          float:'left',
          textAlign: 'center',
          margin: '0 6px'
        }
      },
    });

    return (


      <div style={styles.icon}>
        <i className="fa fa-print fa-lg"   onMouseDown={this.onToggle}></i>
        {this.state.displayColorPicker ?
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose}/>
            <SketchPicker color={this.state.color} onChange={this.handleChange} onChangeComplete={ this.handleChangeComplete }/>
          </div>
          : null}

      </div>


    )
  }

}

export default ColorControl
