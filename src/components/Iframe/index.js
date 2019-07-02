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

  componentDidMount() {
    this.setIframeContent(this.props.value)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setIframeContent(this.props.value)
    }
  }

  setIframeContent = value => {
    const { openLinks, base } = this.props

    window.requestAnimationFrame(() => {
      if (!this._iframe) {
        return
      }
      const doc = this._iframe.contentDocument
      const { documentElement } = doc
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
          if (!imgSrc.startsWith('http') && !imgSrc.startsWith('data')) {
            img.setAttribute('src', `file://${base}/${imgSrc}`)
          }
        })
      }
    })
  }

  render() {
    const { scrolling } = this.props

    return (
      <iframe
        tabIndex={-1}
        scrolling={scrolling ? undefined : 'no'}
        ref={n => (this._iframe = n)}
      />
    )
  }
}

export default Iframe
