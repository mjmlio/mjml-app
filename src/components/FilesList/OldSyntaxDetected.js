import React from 'react'
import { MdWarning as IconWarning } from 'react-icons/md'

import Button from 'components/Button'

export default function OldSyntaxDetected({ onMigrate }) {
  return (
    <div className="OldSyntaxDetected d-f ai-c flow-h-10">
      <IconWarning />
      <span>{'MJML 3 syntax detected'}</span>
      <Button warn onClick={onMigrate} className="ml-auto">
        {'Migrate'}
      </Button>
    </div>
  )
}
