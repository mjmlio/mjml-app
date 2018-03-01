export default {
  files: [
    {
      name: 'index.mjml',
      content: `<mjml>

  <mj-head>

    <mj-attributes>
      <mj-text align="center" color="#555" />
      <mj-container background-color="#eee" />
      <mj-section background-color="#fff" />
    </mj-attributes>

  </mj-head>

  <mj-body>
    <mj-container>
      <mj-section>

        <mj-column>
          <mj-text>
            First column
          </mj-text>
        </mj-column>

        <mj-column>
          <mj-text>
            Second column
          </mj-text>
        </mj-column>

      </mj-section>
    </mj-container>
  </mj-body>

</mjml>`,
    },
  ],
}
