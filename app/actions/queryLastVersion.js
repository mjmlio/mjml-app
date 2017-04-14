import React from 'react'
import semver from 'semver'
import IconStar from 'react-icons/md/star'
import IconDownload from 'react-icons/md/file-download'
import { shell } from 'electron'

import { addNotif } from 'reducers/notifs'

import Button from 'components/Button'

export default function queryLastVersion () {
  return async dispatch => {
    const res = await fetch('https://api.github.com/repos/mjmlio/mjml-app/releases/latest')
    const parsed = await res.json()
    const lastTag = parsed.tag_name
    const isCurrentOutdated = semver.lt(__MJML_APP_VERSION__, lastTag)
    if (isCurrentOutdated) {
      dispatch(addNotif(
        <div>
          <div className='d-f ai-c'>
            <IconStar
              size={20}
              color='#dcab5c'
              className='mr-5'
            />
            {`There is a new version available! (${lastTag})`}
          </div>
          <Button
            primary
            className='mt-20'
            onClick={() => {
              shell.openItem('http://mjml-app.sigsev.io/download')
            }}
          >
            <IconDownload className='mr-5' />
            {'Download now'}
          </Button>
        </div>
      ))
    }
  }
}
