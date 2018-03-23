export function completeAfterSnippet(CodeMirror, cm, snippets) {
  const triggers = {}
  snippets.map(e => {
    return (triggers[e.trigger] = e.content)
  })

  const trigger = cm.findWordAt(cm.getCursor())
  const range = cm.getRange(trigger.anchor, trigger.head)

  if (triggers[range]) {
    cm.replaceRange(
      triggers[range],
      {
        ch: trigger.anchor.ch,
        line: trigger.anchor.line,
      },
      {
        ch: trigger.head.ch,
        line: trigger.head.line,
      },
    )
  }

  return CodeMirror.Pass
}
