import React from 'react'
import os from 'os'
import semver from 'semver'
import IconStar from 'react-icons/md/star'
import IconDownload from 'react-icons/md/file-download'
import { shell } from 'electron'

import { addNotif } from 'reducers/notifs'

import Button from 'components/Button'

function getDownloadURL() {
  switch (os.platform()) {
    case 'darwin':
      return 'http://mjml-app.sigsev.io/download/osx'
    case 'win32':
      return 'http://mjml-app.sigsev.io/download/win_64'
    default:
      return 'http://mjml-app.sigsev.io/download'
  }
}

export default function queryLastVersion() {
  return async dispatch => {
    let lastTag = '0.0.0'
    try {
      const res = await fetch('https://api.github.com/repos/mjmlio/mjml-app/releases/latest')
      const parsed = await res.json()
      if (parsed.tag_name) {
        lastTag = parsed.tag_name
      }
    } catch (e) {} // eslint-disable-line
    const isCurrentOutdated = semver.lt(__MJML_APP_VERSION__, lastTag)
    if (isCurrentOutdated) {
      dispatch(
        addNotif(
          <div>
            <div className="d-f ai-c">
              <IconStar size={20} color="#dcab5c" className="mr-5" />
              {`There is a new version available! (${lastTag})`}
            </div>
            <Button
              primary
              className="mt-20"
              onClick={() => {
                shell.openExternal(getDownloadURL())
              }}
            >
              <IconDownload className="mr-5" />
              {'Download now'}
            </Button>
          </div>,
        ),
      )
    }
  }
}
