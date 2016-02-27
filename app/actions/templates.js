
import { readTemplates as fsReadTemplates } from '../helpers/file-system'

export const readTemplates = () => (dispatch, getState) => {
  const state = getState()
  const { config } = state

  fsReadTemplates(config.get('projectDirectory'))
    .then(console.log.bind(console))
}
