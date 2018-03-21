import { handleActions } from 'redux-actions'

const state = {}

export default handleActions(
  {
    SNIPPET_LOAD: (state, { payload: { snippetName, snippetTrigger, snippetContent } }) => {
      return { snippetName, snippetTrigger, snippetContent }
    },
  },
  state,
)
