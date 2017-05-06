/* eslint-disable */
import CodeMirror from 'codemirror'

const tags = {
  'mj-accordion': {},
  'mj-attributes': {},
  'mj-body': {},
  'mj-button': {},
  'mj-carousel': {},
  'mj-column': {},
  'mj-container': {},
  'mj-core': {},
  'mj-divider': {},
  'mj-font': {},
  'mj-group': {},
  'mj-head': {},
  'mj-hero': {},
  'mj-html': {},
  'mj-image': {},
  'mj-invoice': {},
  'mj-list': {},
  'mj-location': {},
  'mj-navbar': {},
  'mj-raw': {},
  'mj-section': {},
  'mj-social': {},
  'mj-spacer': {},
  'mj-style': {},
  'mj-table': {},
  'mj-text': {},
  'mj-title': {},
  'mj-wrapper': {},
}

export function completeAfter(cm, pred) {
  var cur = cm.getCursor();
  if (!pred || pred()) setTimeout(function() {
    if (!cm.state.completionActive)
      cm.showHint({completeSingle: false});
  }, 100);
  return CodeMirror.Pass;
}
export function completeIfAfterLt(cm) {
  return completeAfter(cm, function() {
    var cur = cm.getCursor();
    return cm.getRange(CodeMirror.Pos(cur.line, cur.ch - 1), cur) == '<';
  });
}
export function completeIfInTag(cm) {
  return completeAfter(cm, function() {
    var tok = cm.getTokenAt(cm.getCursor());
    if (tok.type == 'string' && (!/['"]/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length == 1)) return false;
    var inner = CodeMirror.innerMode(cm.getMode(), tok.state).state;
    return inner.tagName;
  });
}

exports.autocompleteTags = tags
