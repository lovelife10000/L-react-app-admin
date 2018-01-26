import React from 'react'
import { render } from 'react-dom'
import DevTools from '../app/components/Tools/DevTools'

export default function createDevTools(store) {
  if(__DEVCLIENT__ && __DEVTOOLS__ && !window.devToolsExtension){
    setTimeout(() => render(
      <DevTools store={store} />,
      window.document.body.appendChild(document.createElement('div'))
    ), 10)
  }
}
