export default {
  name: 'Confirmation',
  id: 'confirmation',
  mjml: `<mjml>
  <mj-body>
    <mj-container background-color="#dcefff" font-size="13px">
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
      <mj-section background-color="#ffffff" hidden="false" name="Nouvelle section" padding-bottom="0" padding-top="0">
        <mj-column vertical-align="top" width="100%">
          <mj-text align="center" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" container-background-color="#00b1eb" padding-left="25" padding-right="25" padding-bottom="0" padding-top="0">
            <h2 style="font-size: 19px; font-weight: 700; line-height: 30px;"><span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><span style="color: rgb(255, 255, 255);"><span style="font-family: Roboto, Helvetica, Arial, sans-serif;"><span style="font-size: 20px;"><span style="font-size: 25px;">YOUR BOOKING DETAILS</span></span></span></span></span></span></h2>
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section background-color="#ffffff" hidden="false" name="Nouvelle section" image-id="19003" background-url="http://z2mx.mjt.lu/img/z2mx/b/1nu/jsu.png" background-size="cover" padding-bottom="20" padding-top="20">
        <mj-column vertical-align="top" width="100%">
          <mj-image src="http://z2mx.mjt.lu/img/z2mx/b/1nu/jsz.png" alt="" align="left" border="none" width="99" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="22" padding-top="22">

          </mj-image>
        </mj-column>
      </mj-section>
      <mj-section background-color="#ffffff" hidden="false" vertical-align="middle" name="Section-A" padding-bottom="0" padding-top="0">
        <mj-column vertical-align="middle" width="100%">
          <mj-text align="left" color="#000000" font-size="13" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="middle" padding-left="25" padding-right="25" padding-bottom="0" padding-top="0">
            <span style="display: block; font-size: 28px; font-weight: bold;"><h1 style="font-size: 26px; font-weight: 700; line-height: 30px;"><span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><span style="font-size: 25px;"><strong><span style="color: rgb(0, 177, 235);">Hey {{FirstName}}!</span></strong></span></span></h1></span>
          </mj-text>
          <mj-text align="left" color="#000000" font-size="13" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="middle" padding-left="25" padding-right="25" padding-bottom="5" padding-top="5">
            <p></p><p style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><span style="color: rgb(0, 177, 235);">We&apos;re glad you&apos;ve chosen us for your next trip. Here are your travel details:</span></span></p><span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong><span style="color: rgb(0, 177, 235);">Reference: {{TravelReference}}</span></strong></span><p></p>
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section background-color="#DEDC00" hidden="false" name="Nouvelle section" padding-bottom="0" padding-top="0">
        <mj-column vertical-align="top" width="50%">
          <mj-text align="left" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="5" padding-top="5">
            <p><strong><span style="font-size: 15px;"><span style="color: rgb(255, 255, 255);">{{DepartureCity}} =&gt; {{ArrivalCity}}</span></span></strong></p>
          </mj-text>
        </mj-column>
        <mj-column vertical-align="top" width="25%">
          <mj-text align="center" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" container-background-color="#c7c403" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="5" padding-top="5">
            <p><strong><span style="color: rgb(255, 255, 255);">{{TravelDate}}</span></strong></p>
          </mj-text>
        </mj-column>
        <mj-column vertical-align="top" width="25%">
          <mj-text align="left" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="5" padding-top="5">
            <p> <span style="color: rgb(255, 255, 255);">{{TicketPrice}}</span></p>
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section background-color="#FFFDBA" hidden="false" name="Nouvelle section" padding-bottom="0" padding-top="0">
        <mj-column vertical-align="top" width="33.33333333333333%">
          <mj-text align="left" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="5" padding-top="5">
            <p>{{DepartureTime}}</p>
          </mj-text>
        </mj-column>
        <mj-column vertical-align="top" width="33.33333333333333%">
          <mj-text align="left" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="5" padding-top="5">
            <p> {{DepartureStation}} </p>
          </mj-text>
        </mj-column>
        <mj-column vertical-align="top" width="33.33333333333333%">
          <mj-text align="left" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="5" padding-top="5">
            <p>{{TrainNumber}}</p>
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section background-color="#FFFDBA" hidden="false" name="Nouvelle section" padding-bottom="0" padding-top="0">
        <mj-column vertical-align="top" width="33.33333333333333%">
          <mj-text align="left" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="5" padding-top="5">
            <p>{{ArrivalTime}}</p>
          </mj-text>
        </mj-column>
        <mj-column vertical-align="top" width="33.33333333333333%">
          <mj-text align="left" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="5" padding-top="5">
            <p>{{ArrivalStation}}</p>
          </mj-text>
        </mj-column>
        <mj-column vertical-align="top" width="33.33333333333333%">
          <mj-text align="left" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="5" padding-top="5">
            <p><br></p>
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section background-color="#FFFDBA" hidden="false" name="Nouvelle section" padding-bottom="0" padding-top="0">
        <mj-column vertical-align="top" width="100%">
          <mj-text align="left" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="5" padding-top="5">
            <p>Passenger: {{PassengerName}}</p>
          </mj-text>
          <mj-text align="left" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="5" padding-top="5">
            <p>Coach {{CoachNumber}}, seat {{SeatNumber}}</p>
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section background-color="#ffffff" hidden="false" name="Nouvelle section" padding-bottom="0" padding-top="0">
        <mj-column vertical-align="top" width="100%">
          <mj-text align="left" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="0" padding-top="0">
            <p><span style="font-size: 12px;"><span style="color: rgb(0, 177, 235);">[IF the Ticket is refundable]You can change or cancel your ticket before the departure date without any additional fees. Please note that changes or cancellations made on the day of departure will incur in a $10 penalty fee.</span></span> </p>
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section background-color="#556270" hidden="false" name="Nouvelle section" padding-bottom="0" padding-top="0">
        <mj-column vertical-align="top" width="100%">
          <mj-text align="center" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="0" padding-top="0">
            <p style="font-weight: 400; line-height: 30px; margin: 13px 0px;"><span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><span style="color: rgb(255, 255, 255);"><strong><span style="font-family: Roboto, Helvetica, Arial, sans-serif;"><span style="font-size: 20px;"><span style="font-size: 15px;"><span style="font-size: 18px;">You may also like...</span></span></span></span></strong></span></span></span></p>
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section background-color="#ffffff" hidden="false" name="Nouvelle section" padding-bottom="20" padding-top="20">
        <mj-column vertical-align="top" width="50%">
          <mj-image src="http://z2mx.mjt.lu/img/z2mx/b/1nu/jgj.png" alt="" align="center" border="none" vertical-align="top" width="148" padding-left="0" padding-right="0" padding-bottom="0" padding-top="0">

          </mj-image>
          <mj-text align="left" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="10" padding-top="10">
            <p><span style="color: rgb(0, 177, 235);">[IF the trip last more than one night]&#xA0;</span></p><p><span style="color: rgb(0, 177, 235);"><strong>Do you need a hotel room in {{ArrivalCity}}?</strong></span></p>
          </mj-text>
          <mj-button background-color="#DEDC00" color="#FFFFFF" font-size="13px" align="center" vertical-align="top" border="none" padding="15px 30px" border-radius="3" href="https://mjml.io" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25" padding-right="25" padding-bottom="10" padding-top="10">
            <span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong><span style="color: rgb(255, 255, 255);"> Check out our amazing deals!</span></strong></span>
          </mj-button>
        </mj-column>
        <mj-column vertical-align="top" width="50%">
          <mj-image src="http://z2mx.mjt.lu/img/z2mx/b/1nu/jgk.png" alt="" align="center" border="none" width="148" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="0" padding-top="0">

          </mj-image>
          <mj-text align="left" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="10" padding-top="10">
            <p><span style="color: rgb(0, 177, 235);">[ELSE IF the trip last less than one night]</span></p><p><span style="color: rgb(0, 177, 235);"><strong>Do you need a car rental in {{ArrivalCity}}?</strong></span></p>
          </mj-text>
          <mj-button background-color="#DEDC00" color="#FFFFFF" font-size="13px" align="center" vertical-align="top" border="none" padding="15px 30px" border-radius="3" href="https://mjml.io" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25" padding-right="25" padding-bottom="10" padding-top="10">
            <span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong><span style="color: rgb(255, 255, 255);"> Check out our amazing deals!</span></strong></span>
          </mj-button>
        </mj-column>
      </mj-section>
      <mj-section background-color="#ffffff" hidden="false" name="Nouvelle section" padding-bottom="0" padding-top="0">
        <mj-column vertical-align="top" width="100%">
          <mj-text align="left" color="#000000" font-size="13px" word-wrap="break-word" font-family="Ubuntu, Helvetica, Arial, sans-serif" vertical-align="top" padding-left="25" padding-right="25" padding-bottom="10" padding-top="10">
            <p></p><p style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><span style="color: rgb(0, 177, 235);">Best,</span></span></p><span style="font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong><span style="color: rgb(0, 177, 235);">The {{CompanyName}} Team</span></strong></span><p></p>
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
    </mj-container>
  </mj-body>
</mjml>`,
}
