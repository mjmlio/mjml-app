import nodeMailjet from 'node-mailjet'

export default function sendEmail(opts) {
  const { content, Subject, APIKey, APISecret, SenderEmail, TargetEmails } = opts

  const mj = nodeMailjet.connect(APIKey, APISecret)
  const send = mj.post('send')
  const Recipients = TargetEmails.map(t => ({ Email: t }))

  return send.request({
    FromEmail: SenderEmail,
    FromName: 'MJML App',
    Subject,
    'Html-part': content,
    Recipients,
  })
}
