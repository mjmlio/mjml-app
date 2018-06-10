import nodeMailjet from 'node-mailjet'

export default function sendEmail(opts) {
  const { content, Subject, APIKey, APISecret, SenderName, SenderEmail, TargetEmails } = opts

  const mj = nodeMailjet.connect(
    APIKey,
    APISecret,
  )
  const send = mj.post('send')
  const Recipients = TargetEmails.map(t => ({ Email: t }))

  return send.request({
    FromEmail: SenderEmail,
    FromName: SenderName,
    Subject,
    'Html-part': content,
    Recipients,
  })
}
