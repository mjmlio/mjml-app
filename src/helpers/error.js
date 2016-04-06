
export const MJMLError = (message, template) => `
<div style='position: absolute; width: 100%; top: 0; left: 0; padding: 10px; color: #f0f0f0; text-align:center;'>
  <span style='background-color: #e74c3c; padding: 10px;'>${message}</span>
</div>
${template}
`
