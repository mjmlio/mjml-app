import _ from 'lodash'
import { handleActions } from 'redux-actions'
import { List } from 'immutable'

import * as presetsMap from '../assets/presets'

const state = List(_.values(presetsMap))

export default handleActions({
}, state)
