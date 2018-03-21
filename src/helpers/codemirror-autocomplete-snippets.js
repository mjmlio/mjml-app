/* eslint-disable */

export function completeAfterSnippet(CodeMirror, cm, snippets) {
  const triggers = {}
  snippets.map(e => {
    return (triggers['+' + e.trigger] = e.content)
  })

  setTimeout(function() {
    if (!cm.state.completionActive)
      cm.showHint({
        completeSingle: false,
        schemaInfo: triggers,
        tags: 'snippets',
      })
  }, 100)

  return CodeMirror.Pass
}
