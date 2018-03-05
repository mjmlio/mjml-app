export default {
  files: [
    {
      name: 'index.mjml',
      content: `<mjml>

  <mj-head>

    <mj-attributes>
      <mj-text align="center" color="#555" />
      <mj-section background-color="#fff" />
    </mj-attributes>

  </mj-head>

  <mj-body background-color="#eee">
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
  </mj-body>
</mjml>`,
    },
  ],
}
