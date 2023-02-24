/* eslint-disable */
import presetCore from 'mjml-preset-core'

let cachedTags;

function getTags() {
  if (cachedTags) {
    return cachedTags;
  }

  cachedTags = {};

  for (const component of presetCore.components) {
    const name = component.componentName;
  
    const entry = {
      attrs: {}
    };
  
    const attributes = component.allowedAttributes;

    if (attributes) {
      for (const [attributeName, attributeType] of Object.entries(attributes)) {
        const match = attributeType && attributeType.match(/enum\(([^\)]+)\)/);

        if (match) {
          entry.attrs[attributeName] = match[1].split(',').map(x => x.trim()).filter(x => x.length > 0);
        } else {
          entry.attrs[attributeName] = null;
        }
      }
    }

    const children = presetCore.dependencies[name];

    if (children && children.findIndex(x => typeof x !== 'string') < 0) {
      entry.children = children;
    }
  
    cachedTags[name] = entry;
  }

  return cachedTags;
}

export function completeAfter(CodeMirror, cm, pred) {
  var cur = cm.getCursor()
  if (!pred || pred())
    setTimeout(function() {
      if (!cm.state.completionActive)
        cm.showHint({
          completeSingle: false,
          schemaInfo: getTags(),
          tags: 'mjml',
        })
    }, 100)
  return CodeMirror.Pass
}

export function completeIfAfterLt(CodeMirror, cm) {
  return completeAfter(CodeMirror, cm, function() {
    var cur = cm.getCursor()
    return cm.getRange(CodeMirror.Pos(cur.line, cur.ch - 1), cur) == '<'
  })
}

export function completeIfInTag(CodeMirror, cm) {
  return completeAfter(CodeMirror, cm, function() {
    var tok = cm.getTokenAt(cm.getCursor())
    if (
      tok.type == 'string' &&
      (!/['"]/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length == 1)
    )
      return false
    var inner = CodeMirror.innerMode(cm.getMode(), tok.state).state
    return inner.tagName
  })
}
