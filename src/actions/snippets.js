import { addAlert } from 'reducers/alerts'

import { saveSettings } from 'actions/settings'

export function addSnippet(snippetName, snippetTrigger, snippetContent) {
  return dispatch => {
    dispatch({
      type: 'SNIPPET_ADD',
      payload: {
        snippetName,
        snippetTrigger,
        snippetContent,
      },
    })
    dispatch(saveSettings())
    dispatch(addAlert(`Created ${snippetName}`, 'success'))
  }
}

export function updateSnippet(snippetName, snippetTrigger, snippetContent) {
  return dispatch => {
    dispatch({
      type: 'SNIPPET_UPDATE',
      payload: {
        snippetName,
        snippetTrigger,
        snippetContent,
      },
    })
    dispatch(saveSettings())
    dispatch(addAlert(`Updated ${snippetName}`, 'success'))
  }
}

export function deleteSnippet(snippetName) {
  return dispatch => {
    dispatch({
      type: 'SNIPPET_DELETE',
      payload: { snippetName },
    })
    dispatch(saveSettings())
    dispatch(addAlert(`Deleted ${snippetName}`, 'success'))
  }
}

export function loadSnippet(snippetName, snippetTrigger, snippetContent) {
  return dispatch => {
    dispatch({
      type: 'SNIPPET_LOAD',
      payload: {
        snippetName,
        snippetTrigger,
        snippetContent,
      },
    })
    dispatch(saveSettings())
  }
}