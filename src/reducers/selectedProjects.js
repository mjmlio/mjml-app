import { handleActions, createAction } from 'redux-actions'

const initialState = []

export default handleActions(
  {
    SELECTED_PROJECTS_ADD: (state, { payload: projectPath }) => [...state, projectPath],
    SELECTED_PROJECTS_SET: (state, { payload: projectsPaths }) => projectsPaths,
    SELECTED_PROJECTS_REMOVE: (state, { payload: projectPath }) =>
      state.filter(p => p !== projectPath),
    SELECTED_PROJECTS_RESET: () => initialState,
  },
  initialState,
)

export const setSelectedProjects = createAction('SELECTED_PROJECTS_SET')
export const selectProject = createAction('SELECTED_PROJECTS_ADD')
export const unselectProject = createAction('SELECTED_PROJECTS_REMOVE')

export const toggleSelectProject = projectPath => {
  return (dispatch, getState) => {
    const state = getState()
    if (state.selectedProjects.indexOf(projectPath) > -1) {
      dispatch(unselectProject(projectPath))
    } else {
      dispatch(selectProject(projectPath))
    }
  }
}

export const selectAllProjects = () => (dispatch, getState) => {
  const state = getState()
  const projectsPaths = state.projects.map(p => p.get('path')).toArray()
  dispatch(setSelectedProjects(projectsPaths))
}

export const unselectAllProjects = createAction('SELECTED_PROJECTS_RESET')
