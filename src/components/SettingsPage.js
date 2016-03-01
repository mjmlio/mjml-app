
import React, { Component } from 'react'
import shortid from 'shortid'

import '../styles/Settings.scss'

const propertyFields = {
  'Editor': ['Font Family', 'Font Size', 'Theme'],
  'File System': ['Projects Folder']
}

class SettingsPage extends Component {

  setProperty (key, value) {
    localStorage.setItem(key, value)
  }

  getConfig () {
    // this.state = localStorage.getItem('appconfig')
    return Object.keys(propertyFields)
      .map(section => propertyFields[section])
      .reduce((p, c) => p.concat(c), [])
      .reduce((p, c) => {
        p[c] = localStorage.getItem(c)
        return p
      }, {})
  }

  renderInput (key, value) {
    const id = shortid.generate()

    return (
      <li className='setting' key={shortid.generate()}>
        <label htmlFor={id}>{key}</label>
        <br />
        <input type='text'
               className='value'
               value={value}
               ref={el => this[id] = el}
               onChange={() => this.setProperty(key, this[id].value)} />
      </li>
    )
  }

  renderSection (section, fields) {
    const config = this.getConfig()
    const properties = fields.map(f => [f, config[f]])
    return (
      <li key={shortid.generate()}>
        <h3>{section}</h3>
        <ul className='settings-list'>
          {properties.map(p => this.renderInput(...p))}
        </ul>
      </li>
    )
  }

  render () {

    const sections = Object.keys(propertyFields).map(k => [k, propertyFields[k]])

    return (
      <div className='settings-container anim-page'>
        <ul>
          {sections.map(p => this.renderSection(...p))}
        </ul>
      </div>
    )
  }
}

export default SettingsPage
