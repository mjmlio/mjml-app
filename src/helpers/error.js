
/**
 * Add an error header to the template explaining why the compilation failed
 *
 * @param {String} message error message
 * @param {String} template Html template content
 * @returns {String} the newly created template
 */
export const MJMLError = (message, template) => `
<div style='position: fixed; width: 100%; top: 0; left: 0; padding: 10px; color: #f0f0f0; text-align:center;'>
  <span style='background-color: #e74c3c; padding: 10px;'>${message}</span>
</div>
${template}
`
