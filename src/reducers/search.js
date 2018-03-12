import { handleActions, createAction } from 'redux-actions'
import path from 'path'
import { Set } from 'immutable'
import Fuse from 'fuse.js'

const FUSE_OPTS = {
  keys: ['name'],
  threshold: 0.5,
}

const state = {
  text: '',
  raw: [],
  results: Set(),
  fuse: null,
}

function compileResults(fuse, text) {
  const fuseResults = fuse.search(text) || []
  return Set(fuseResults.map(proj => proj.path))
}

function resetSearch(state) {
  const { raw, text, results } = state
  const fuse = new Fuse(raw, FUSE_OPTS)
  const res = compileResults(fuse, text)
  return {
    ...state,
    fuse,
    results: results.union(res),
  }
}

function serializeRaw(raw) {
  return {
    path: raw.path,
    name: path.basename(raw.path),
  }
}

export default handleActions(
  {
    PROJECTS_LOAD: (state, { payload: projects }) =>
      resetSearch({
        ...state,
        raw: projects.map(serializeRaw),
      }),
    PROJECT_LOAD: (state, { payload: project }) =>
      resetSearch({
        ...state,
        raw: [serializeRaw(project), ...state.raw],
      }),
    SEARCH: (state, { payload: text }) => {
      return {
        ...state,
        text,
        results: compileResults(state.fuse, text),
      }
    },
  },
  state,
)

export const searchText = createAction('SEARCH', text => text)
