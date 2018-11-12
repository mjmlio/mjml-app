import { has, get } from 'lodash'

export default function(template, l10n)  {
  const parts = template.split(/\${([^}]+)\}/)

  const result = parts.map(item => {
    if (has(l10n, item)) {
      return get(l10n, item)
    }

    return item
  })

  return result.join('')
}