import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { shell } from 'electron'

class Iframe extends Component {

  static propTypes = {
    scrolling: PropTypes.bool,
    value: PropTypes.string,
    openLinks: PropTypes.bool,
    base: PropTypes.string,
  }

  static defaultProps = {
    scrolling: true,
    openLinks: false,
    value: '',
    base: '',
  }

  componentDidMount () {
    this.setIframeContent(this.props.value)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setIframeContent(this.props.value)
    }
  }

  setIframeContent = value => {

    const {
      openLinks,
      base,
    } = this.props

    window.requestAnimationFrame(() => {
      if (!this._iframe) { return }
      const doc = this._iframe.contentDocument
      const documentElement = doc.documentElement
      documentElement.innerHTML = value

      if (openLinks) {
        const links = [...documentElement.querySelectorAll('a')]
        links.forEach(link => {
          link.addEventListener('click', e => {
            e.preventDefault()
            const href = link.getAttribute('href')
            if (href) {
              shell.openExternal(href)
            }
          })
        })
      }

      if (base) {
        const images = [...documentElement.querySelectorAll('img')]
        images.forEach(img => {
          const imgSrc = img.getAttribute('src')
          if (!imgSrc.startsWith('http')) {
            img.setAttribute('src', `file://${base}/${imgSrc}`)
          }
        })
        
        const tables = [...documentElement.querySelectorAll('table')]
        tables.forEach(table => {
          if (table.getAttribute('background')) {
            const tableBackground = table.getAttribute('background')
            if (tableBackground && !tableBackground.startsWith('http')) {
              table.setAttribute('background', `file://${base}/${tableBackground}`)
            }
          }
        })
        
        const tds = [...documentElement.querySelectorAll('td')]
        tds.forEach(td => {
          if (td.getAttribute('background')) {
            const tdBackground = td.getAttribute('background')
            if (tdBackground && !tdBackground.startsWith('http')) {
              let tdStyle = td.getAttribute('style').replace(tdBackground, `file://${base}/${tdBackground}`)
              td.setAttribute('style', tdStyle)
            }
          }
        })
      }

    })
  }

  render () {

    const {
      scrolling,
    } = this.props

    return (
      <iframe
        tabIndex={-1}
        scrolling={scrolling ? undefined : 'no'}
        ref={n => this._iframe = n}
      />
    )
  }

}

export default Iframe
