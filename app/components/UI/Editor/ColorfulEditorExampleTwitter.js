import React, {Component} from 'react'
import {Editor, EditorState, Modifier, RichUtils} from 'draft-js'
// import ColorControls from './ColorControls'
import ColorControlTwitter from './ColorControlTwitter'
import Undo from './Undo'
import Repeat from './Repeat'
import Bold from './Bold'

const colorStyleMap = {
  red: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
};

class ColorfulEditorExample extends Component {
  constructor() {
    super()
    this.state = {editorState: EditorState.createEmpty()};

    this.focus = () => this.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.toggleColor = (toggledColor, toggledColorRgb) => this._toggleColor(toggledColor, toggledColorRgb);
  }

  _toggleColor(toggledColor, toggledColorRgb) {
    console.log('完成3')
    const {editorState} = this.state;
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    console.log('完成4', !currentStyle.has(toggledColor), toggledColor)
    if (!colorStyleMap.toggleColor) {
      console.log('完成4.5')
      // let key=to
      // Object.assign(colorStyleMap,{toggledColor:{color:}})
      colorStyleMap[toggledColor] = {color: 'rgba(' + toggledColorRgb.r + ',' + toggledColorRgb.g + ',' + toggledColorRgb.b + ',' + toggledColorRgb.a + ')'}
    }
    console.log('完成5', colorStyleMap)
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    this.onChange(nextEditorState);
  }

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
    };

    const {editorState} = this.state;
    return (

      <div style={styles.root}>
        <Undo/>
        <Repeat/>
        <Bold/>
        <ColorControlTwitter
          onToggle={this.toggleColor}
        />
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            customStyleMap={colorStyleMap}
            editorState={editorState}
            onChange={this.onChange}
            placeholder="Write something colorful..."
            ref={(ref) => this.editor = ref}
          />
        </div>
      </div>


    )
  }

}

export default ColorfulEditorExample
