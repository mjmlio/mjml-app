export default {
  files: [
    {
      name: 'index.mjml',
      content: `<mjml>

  <mj-head>

    <mj-attributes>
      <mj-text align="center" color="#555" />
      <mj-body background-color="#eee" />
    </mj-attributes>

  </mj-head>

  <mj-body>
    <mj-include path="./header.mjml" />

    <mj-section background-color="#fff">

      <mj-column>
        <mj-text align="center">
          <h2>MJML Rocks!</h2>
        </mj-text>
      </mj-column>

      <mj-column>
        <mj-image width="200" src="http://placehold.it/200x200"></mj-image>
      </mj-column>

    </mj-section>

    <mj-include path="./footer.mjml" />
  </mj-body>

</mjml>`,
    },
    {
      name: 'header.mjml',
      content: `<mj-section>

  <mj-column>
    <mj-text>
      This is the header
    </mj-text>
  </mj-column>

</mj-section>`,
    },
    {
      name: 'footer.mjml',
      content: `<mj-section>

  <mj-column>
    <mj-text>
      This is the footer
    </mj-text>
  </mj-column>

</mj-section>`,
    },
  ],
}
