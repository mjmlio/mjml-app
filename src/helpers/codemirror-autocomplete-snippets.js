/* eslint-disable */

export const snippets = {
  toto: {},
}

export function completeAfterSnippet(CodeMirror, cm) {
  var cur = cm.getCursor()
  setTimeout(function() {
    if (!cm.state.completionActive)
      cm.showHint({
        completeSingle: true,
        schemaInfo: snippets,
      })
  }, 100)
  return CodeMirror.Pass
}
//   export function completeIfAfterLtSnippet(CodeMirror, cm) {
//     return completeAfter(CodeMirror, cm, function() {
//       var cur = cm.getCursor()
//       return cm.getRange(CodeMirror.Pos(cur.line, cur.ch - 1), cur) == '<'
//     })
//   }
//   export function completeIfInTagSnippet(CodeMirror, cm) {
//     return completeAfter(CodeMirror, cm, function() {
//       var tok = cm.getTokenAt(cm.getCursor())
//       if (
//         tok.type == 'string' &&
//         (!/['"]/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length == 1)
//       )
//         return false
//       var inner = CodeMirror.innerMode(cm.getMode(), tok.state).state
//       return inner.tagName
//     })
//   }
