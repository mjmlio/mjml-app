import { addAlert } from 'reducers/alerts'

import {
  saveSettings,
} from 'actions/settings'

export function addSnippet(s, t, c) {
  return dispatch => {
    dispatch({
      type: 'SNIPPET_ADD',
      payload: {
        snippetName: s,
        snippetTrigger: t,
        snippetContent: c
      },
    })
    dispatch(saveSettings())
    dispatch(addAlert('Created a snippet', 'success'))
  }
}

export function updateSnippet(s, t, c) {
  return dispatch => {
    dispatch({
      type: 'SNIPPET_UPDATE',
      payload: {
        snippetName: s,
        snippetTrigger: t,
        snippetContent: c
      },
    })
    dispatch(saveSettings())
    dispatch(addAlert('Updated a snippet', 'success'))
  }
}