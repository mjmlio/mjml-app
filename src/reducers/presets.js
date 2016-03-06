import _ from 'lodash'
import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

import * as presetsMap from '../assets/presets'

const state = fromJS(_.values(presetsMap))

export default handleActions({
}, state)
