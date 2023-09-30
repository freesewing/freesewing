import { wrap } from '../shared/blocks.mjs'

export const langsuggest = {
  html: wrap.html(`
  <p>A new language was suggested to translate FreeSewing into. Here are the details:</p>
  <pre>{{ datadump }}</pre>
  <p>The user who suggested this is:</p>
  <pre>{{ userdump }}</pre>
  `),
  text: wrap.text(`
A new language was suggested to translate FreeSewing into. Here are the details:</p>

{{ datadump }}

The user who suggested this is:

{{ userdump }}
 `),
}
