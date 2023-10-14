import { wrapper } from './shared.mjs'

export const html = wrapper({
  content: `
<h1><span role="img">👋</span></h1>
<h2>This is the FreeSewing backend</h2>
<p>
  For info about FreeSewing, try <a href="https://freesewing.org/">freesewing.org</a> instead.
</p>
<p>
  For info about this backend, refer to <a href="https://freesewing.dev/reference/backend">the FreeSewing backend refefence documentation</a>.
</p>
<p>
  For questions, join us at
  <a href="https://discord.freesewing.org/">discord.freesewing.org</a>
</p>
`,
})
