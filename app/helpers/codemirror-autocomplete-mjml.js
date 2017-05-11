/* eslint-disable */
import CodeMirror from 'codemirror'

const tags = { 
  'mj-accordion': {},
  'mj-accordion-element': {},
  'mj-accordion-title': {},
  'mj-accordion-text': {},
  'mj-button': {},
  'mj-carousel': {},
  'mj-carousel-image': {},
  'mj-column': {},
  'mj-container': {},
  'mj-divider': {},
  'mj-group': {},
  'mj-attributes': {},
  'mj-font': {},
  'mj-style': {},
  'mj-title': {},
  'mj-hero': {},
  'mj-hero-content': {},
  'mj-html': {},
  'mj-image': {},
  'mj-invoice': {},
  'mj-invoice-item': {},
  'mj-list': {},
  'mj-location': {},
  'mj-navbar': {},
  'mj-inline-links': {},
  'mj-link': {},
  'mj-raw': {},
  'mj-section': {},
  'mj-social': {},
  'mj-spacer': {},
  'mj-table': {},
  'mj-text': {},
  'mj-wrapper': {} 
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
