const mjml = require('mjml')

exports.mjml2html = (mjmlInput, done) => {
  try {
    const res = mjml.mjml2html(mjmlInput)
    done(null, res.html)
  } catch (e) {
    done(e.message)
  }
}
