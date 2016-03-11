
export const MJMLError = (message) =>
`
<mj-body background-color="#f0f0f0">
  <mj-section></mj-section>
  <mj-section background-color="#fff">
    <mj-column>
      <mj-text
        color="red"
        font-weight="bolder"
        font-size="20px"
        align="center">Error:</mj-text>
    </mj-column>
  </mj-section>
  <mj-section background-color="#fff">
    <mj-column>
      <mj-text
        color="red"
        font-size="16px"
        align="center">
				${message}
      </mj-text>
    </mj-column>
  </mj-section>
</mj-body>
`
