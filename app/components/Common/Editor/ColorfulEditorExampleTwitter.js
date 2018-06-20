import React, {Component} from 'react'
import {Editor, EditorState, Modifier, RichUtils} from 'draft-js'
// import ColorControls from './ColorControls'
import Code from './Code'
import MailReply from './MailReply'
import MailForward from './MailForward'
import Bold from './Bold'
import Italic from './Italic'
import Underline from './Underline'
import StrikeThrough from './Strikethrough'
import SuperScript from './Superscript'
import ColorControlTwitter from './ColorControlTwitter'
import Th from './Th'
import Eraser from './Eraser'
import ListOl from './ListOl'
import ListUl from './ListUl'
import FileO from './FileO'
import TitleSize from './TitleSize'
import Font from './Font'
import FontSize from './FontSize'
import AlignLeft from './AlignLeft'
import AlignCenter from './AlignCenter'
import AlignRight from './AlignRight'
import Chain from './Chain'
import ChainBroken from './ChainBroken'
import SmileO from './SmileO'
import Image from './Image'
import Film from './Film'
import MapMarker from './MapMarker'
import Minus from './Minus'

const colorStyleMap = {
  red: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
}

class ColorfulEditorExample extends Component {
  constructor() {
    super()
    this.state = {editorState: EditorState.createEmpty()}

    this.focus = () => this.editor.focus()
    this.onChange = (editorState) => this.setState({editorState})
    this.toggleColor = (toggledColor, toggledColorRgb) => this._toggleColor(toggledColor, toggledColorRgb)
  }

  _toggleColor(toggledColor, toggledColorRgb) {
    console.log('完成3')
    const {editorState} = this.state
    const selection = editorState.getSelection()

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent())

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    )

    const currentStyle = editorState.getCurrentInlineStyle()

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color)
      }, nextEditorState)
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
      )
    }

    this.onChange(nextEditorState)
  }

  render() {

    const styles = {
      root: {
        fontFamily: '\'Georgia\', serif',
        fontSize: 14,
      },
      editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        fontSize: 16,
        marginTop: 10,
        minHeight: 400,
        paddingTop: 5,
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

    const {editorState} = this.state
    return (

      <div className="form-group" style={styles.root}>
        <label className="col-sm-2 control-label">备注</label>




        <div className="col-sm-8">
          <div className="clearfix">
            <Code/>
            <MailReply/>
            <MailForward/>
            <Bold/>
            <Italic/>
            <Underline/>
            <StrikeThrough/>
            <SuperScript/>
            <ColorControlTwitter
              onToggle={this.toggleColor}
            />
            <Th/>
            <Eraser/>
            <ListOl/>
            <ListUl/>
            <FileO/>
            <TitleSize/>
            <Font/>
            <FontSize/>
            <AlignLeft/>
            <AlignCenter/>
            <AlignRight/>
            <Chain/>
            <ChainBroken/>
            <SmileO/>
            <Image/>
            <Film/>
            <MapMarker/>
            <Minus/>
          </div>

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
      </div>


    )
  }

}

export default ColorfulEditorExample
