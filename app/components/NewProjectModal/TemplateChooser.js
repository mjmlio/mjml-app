import React, { Component } from 'react'
import cx from 'classnames'
import Collapse from 'react-collapse'
import IconChecking from 'react-icons/md/autorenew'
import values from 'lodash/values'

// import fetchTemplates from 'helpers/fetchTemplates'

import Tabbable from 'components/Tabbable'

const githubTemplatesRoot = 'https://raw.githubusercontent.com/mjmlio/email-templates/master'

class TemplateChooser extends Component {

  state = {
    // can be basic | gallery
    source: 'basic',

    isFetching: false,
    isError: false,
    gallery: [],
  }

  async fetchTemplates () {
    const res = await fetch('https://api.github.com/repos/mjmlio/email-templates/git/trees/master?recursive=1')
    const parsedRes = await res.json()
    const { tree } = parsedRes
    const imagesToLoad = []
    const map = tree.reduce((map, item) => {

      const { path } = item

      if (!path.startsWith('templates/') && !path.startsWith('thumbnails/')) {
        return map
      }

      const extract = (/.*\/([^.]*)\..*/).exec(path)
      if (!extract) { return map }

      const templateName = extract[1]
      const isMJML = path.endsWith('.mjml')

      if (!map[templateName]) { map[templateName] = {} }

      const fullPath = `${githubTemplatesRoot}/${path}`

      if (isMJML) {
        map[templateName].mjml = fullPath
        map[templateName].name = templateName
      } else {
        imagesToLoad.push(fullPath)
        map[templateName].thumbnail = fullPath
      }

      return map

    }, {})

    await Promise.all(imagesToLoad.map(this.loadImage))

    return values(map)
  }

  loadImage (src) {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = resolve
      img.onerror = resolve
      img.src = src
    })
  }

  handleChangeSource = async source => {
    this.setState({ source })
    if (source === 'gallery') {

      if (this.state.isFetching) { return }
      this.setState({ isFetching: true })

      try {
        const gallery = await this.fetchTemplates()
        this.setState({
          isFetching: false,
          isError: false,
          gallery,
        })
        this.handleSelectGalleryTemplate(0)
      } catch (err) {
        this.setState({
          isFetching: false,
          isError: true,
        })
      }

    }
  }

  handleSelectGalleryTemplate = i => {
    this.props.onSelect(this.state.gallery[i])
  }

  render () {

    const {
      template,
      onSelect,
    } = this.props

    const {
      source,
      isFetching,
      isError,
      gallery,
    } = this.state

    return (
      <div className='flow-v-20'>

        <div className='d-f'>
          <Tabbable
            onClick={() => this.handleChangeSource('basic')}
            className={cx('TemplateChooserTabs--tab f-1 cu-d', {
              isActive: source === 'basic',
            })}
          >
            {'Basic'}
          </Tabbable>
          <Tabbable
            onClick={() => this.handleChangeSource('gallery')}
            className={cx('TemplateChooserTabs--tab f-1 cu-d', {
              isActive: source === 'gallery',
            })}
          >
            {'Gallery'}
          </Tabbable>
        </div>

        <Collapse isOpened springConfig={{ stiffness: 300, damping: 30 }}>

          {source === 'basic' ? (
            <div>
              <TabItem
                autoFocus
                name='singleBasic'
                template={template}
                onSelect={onSelect}
              >
                {'Single file, basic layout'}
              </TabItem>

              <TabItem name='headerFooter' template={template} onSelect={onSelect}>
                {'Separated header / footer'}
              </TabItem>
            </div>
          ) : source === 'gallery' ? (
            <div>
              {isFetching ? (
                <div className='z' style={{ height: 250 }}>
                  <IconChecking className='rotating mb-20' size={30} />
                  {'Fetching templates...'}
                </div>
              ) : isError ? (
                <div>
                  {'Error'}
                </div>
              ) : (
                <div className='r' style={{ height: 450 }}>
                  <div className='sticky o-y-a Gallery'>
                    {gallery.map((tpl, i) => (
                      <Tabbable
                        key={tpl.name}
                        onClick={() => this.handleSelectGalleryTemplate(i)}
                        className={cx('Gallery-Item-wrapper', {
                          isSelected: template.name === tpl.name,
                        })}
                      >
                        <div
                          className='Gallery-Item'
                          style={{
                            backgroundImage: `url(${tpl.thumbnail})`,
                          }}
                        >
                          <div className='Gallery-item-label small'>
                            {tpl.name}
                          </div>
                        </div>
                      </Tabbable>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </Collapse>

      </div>
    )
  }

}

function TabItem ({ name, onSelect, template, children }) {
  return (
    <Tabbable
      className={cx('TemplateChooser--template', {
        active: template === name,
      })}
      onClick={() => onSelect(name)}
      tabIndex={0}
    >
      {children}
    </Tabbable>
  )
}

export default TemplateChooser
