import nodeMailjet from 'node-mailjet'

export default async function sendEmail (opts) {

  const {
    content,
    APIKey,
    APISecret,
    SenderEmail,
    TargetEmails,
  } = opts

  const mj = nodeMailjet.connect(APIKey, APISecret)
  const send = mj.post('send')
  const Recipients = TargetEmails.map(t => ({ Email: t }))

  return send.request({
    FromEmail: SenderEmail,
    FromName: 'MJML App',
    Subject: 'MJML App test email',
    'Html-part': content,
    Recipients,
  })

}
