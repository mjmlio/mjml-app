import React from 'react'
import { render } from 'react-dom'

import 'styles/main.scss'
import App from 'components/App'
import loadAssets from 'utils/load-assets'

loadAssets()
  .then(() => {
    const mountNode = document.getElementById('root')
    render(<App />, mountNode)
  })

