import CodeMirror from 'codemirror'

export default function foldByLevel(cm, foldLevel) {
  const mode = cm.getMode()
  for (let l = cm.firstLine(); l <= cm.lastLine(); ++l) {
    const pos = { line: l, ch: 0 }
    const token = cm.getTokenAt(pos)
    const inner = CodeMirror.innerMode(mode, token.state)
    const { context } = inner.state
    if (context) {
      const { indent } = context
      if (indent >= foldLevel) {
        cm.foldCode(pos, null, 'fold')
      } else {
        cm.foldCode(pos, null, 'unfold')
      }
    }
  }
}
