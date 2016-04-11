export default {
  id: 'referral',
  name: 'Referral',
  mjml: `<mj-body background-color="#bedae6" font-size="13px">
  <mj-section hidden="false" locked="true" full-width="full-width" padding-bottom="20" padding-top="20">
    <mj-column vertical-align="middle" width="66.66666666666666%">
      <mj-text align="left" color="#000000" font-size="11" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" locked="true" editable="true" vertical-align="middle" padding-left="25" padding-right="25" padding-bottom="0" padding-top="0">
        <span style="font-size: 11px">[[HEADLINE]]</span>
      </mj-text>
    </mj-column>
    <mj-column vertical-align="middle" width="33.33333333333333%">
      <mj-text align="right" color="#000000" font-size="11" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" locked="true" editable="false" vertical-align="middle" padding-left="25" padding-right="25" padding-bottom="0" padding-top="0">
        <span style="font-size: 11px"><a href="https://mjml.io" target="_blank" style="text-decoration: none; color: inherit">[[PERMALINK_LABEL]]</a></span>
      </mj-text>
    </mj-column>
  </mj-section>
  <mj-section background-color="#ffffff" hidden="false" vertical-align="middle" name="Section-A" image-id="19872" background-url="http://z2mx.mjt.lu/img/z2mx/b/lwo/k05.png" background-size="cover" padding-bottom="0" padding-top="0">
    <mj-column vertical-align="middle" width="100%">
      <mj-image src="http://z2mx.mjt.lu/img/z2mx/b/lwo/k0g.png" alt="" align="center" border="none" vertical-align="middle" width="210" padding-left="25" padding-right="25" padding-bottom="60" padding-top="60">

      </mj-image>
    </mj-column>
  </mj-section>
  <mj-section background-color="#ffffff" hidden="false" name="Nouvelle section" padding-bottom="20" padding-top="10">
    <mj-column vertical-align="top" width="100%">
      <mj-text align="center" color="#000000" font-size="13" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="10" padding-top="10">
        <span style="display: block; font-size: 28px; font-weight: bold;"><span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong><span style="font-size: 20px;"><span style="color: rgb(81, 45, 11);">Hey {{FirstName}}!</span></span></strong></span></span>
      </mj-text>
      <mj-text align="center" color="#000000" font-size="13" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="0" padding-top="0">
        <p></p><p style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><span style="font-size: 18px;">Are you enjoying our weekly newsletter?</span></span></p><p style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><span style="font-size: 18px;">Then why not share it with your friends? </span></span></p><p></p>
      </mj-text>
      <mj-image src="http://z2mx.mjt.lu/img/z2mx/b/lwo/ks5.png" alt="" align="center" border="none" width="271" vertical-align="top" padding-left="0" padding-right="0" padding-bottom="10" padding-top="10">

      </mj-image>
      <mj-text align="center" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="0" padding-top="0">
        <p><span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong><span style="color: rgb(68, 154, 220);"><span style="font-size: 25px;">You&apos;ll get a 15% discount&#xA0;</span></span></strong></span></p><p><span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong><span style="font-size: 18px;"><span style="color: rgb(68, 154, 220);">on your next order </span></span></strong></span><strong style="font-family: Arial; font-size: 14.666666666666666px; white-space: pre-wrap;"><span style="font-size: 18px;"><span style="color: rgb(68, 154, 220);">when a friend uses the code</span></span></strong></p><p><span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong><span style="font-size: 18px;"><span style="color: rgb(68, 154, 220);">{{ReferalCode}}!</span></span></strong></span></p>
      </mj-text>
      <mj-button background-color="#8bb420" color="#FFFFFF" font-size="13px" align="center" vertical-align="top" border="none" padding="15px 30px" border-radius="0px" href="https://mjml.io" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25" padding-right="25" padding-bottom="10" padding-top="10">
        <strong>Refer a friend now !</strong>
      </mj-button>
      <mj-image src="http://z2mx.mjt.lu/img/z2mx/b/lwo/ksr.png" alt="" align="center" border="none" width="251" vertical-align="top" padding-left="0" padding-right="0" padding-bottom="10" padding-top="10">

      </mj-image>
      <mj-text align="center" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="10" padding-top="10">
        <p></p><p style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best,</span></p><span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">The {{CompanyName}} Team</span><p></p>
      </mj-text>
    </mj-column>
  </mj-section>
  <mj-section hidden="false" locked="true" full-width="full-width" padding-bottom="20" padding-top="20">
    <mj-column vertical-align="middle" width="100%">
      <mj-text align="center" color="#000000" font-size="11" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" locked="true" editable="false" vertical-align="middle" padding-left="25" padding-right="25" padding-bottom="0" padding-top="0">
        <p style="font-size: 11px">[[DELIVERY_INFO]]</p>
      </mj-text>
      <mj-text align="center" color="#000000" font-size="11" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" locked="true" editable="true" vertical-align="middle" padding-left="25" padding-right="25" padding-bottom="0" padding-top="0">
        <p style="font-size: 11px"><span>   FR</span></p>
      </mj-text>
    </mj-column>
  </mj-section>
</mj-body>`,
}
