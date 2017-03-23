import React, { Component } from 'react'
import cx from 'classnames'

class TemplateChooser extends Component {

  render () {

    const {
      template,
      onSelect,
    } = this.props

    return (
      <div className='TemplateChooser'>

        <Template
          autoFocus
          name='singleBasic'
          template={template}
          onSelect={onSelect}
        >
          {'Single file, basic layout'}
        </Template>

        <Template name='headerFooter' template={template} onSelect={onSelect}>
          {'Separated header / footer'}
        </Template>

      </div>
    )
  }

}

function Template ({ name, onSelect, template, children, autoFocus }) {
  return (
    <button
      autoFocus={autoFocus}
      className={cx('TemplateChooser--template', {
        active: template === name,
      })}
      onClick={() => onSelect(name)}
      tabIndex={0}
    >
      {children}
    </button>
  )
}

export default TemplateChooser
