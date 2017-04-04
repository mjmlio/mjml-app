// import nodeMailjet from 'node-mailjet'

export default async function sendEmail (opts) {

  const {
    content,
    APIKey,
    APISecret,
    SenderEmail,
    TargetEmail,
  } = opts

  const mj = nodeMailjet.connect(APIKey, APISecret)
  const send = mj.post('send')

  return send({
    FromEmail: SenderEmail,
    FromName: 'MJML App',
    Subject: 'MJML App test email',
    'Html-part': content,
    Recipients: [
      { Email: TargetEmail },
    ],
  })

}
