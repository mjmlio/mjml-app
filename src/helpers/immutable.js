import { fromJS } from 'immutable'

export function safeFromJS(obj, def) {
  let res
  try {
    fromJS(obj)
  } catch (err) {
    res = fromJS(def)
  }
  return res
}
