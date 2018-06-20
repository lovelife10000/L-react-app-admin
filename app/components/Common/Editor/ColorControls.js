import React, {Component} from 'react'
import StyleButton from './StyleButton'
import PropTypes from 'prop-types'

class ColorControls extends Component {
  constructor() {
    super()
  }

  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onToggle: PropTypes.func,
  };


  render() {
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


    const {editorState} = this.props
    var currentStyle = editorState.getCurrentInlineStyle()
    return (


      <div style={styles.controls}>
        <StyleButton
          active={currentStyle.has('red')}
          label={'Red'}
          onToggle={this.props.onToggle}
          style={'red'}
        />


      </div>


    )
  }

}

export default ColorControls
