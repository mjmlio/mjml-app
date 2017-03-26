export default {
  files: [
    {
      name: 'index.mjml',
      content: `<mjml>
  <mj-body>
    <mj-container>

      <mj-include path="./header.mjml" />

      <mj-section>

        <mj-column>
          <mj-text>
            Hello world.
          </mj-text>
        </mj-column>

      </mj-section>

      <mj-include path="./footer.mjml" />

    </mj-container>
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
