const mjml = require('mjml')

exports.mjml2html = (mjmlInput, filePath, done) => {
  try {
    const res = mjml.mjml2html(mjmlInput, { filePath })
    done(null, res.html)
  } catch (e) {
    done(e.message)
  }
}
