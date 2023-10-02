export const wrapper = ({ title = 'FreeSewing', header, content }) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="/css/style.css">
  </head>
  <body>
    <div class="wrapper">
      ${header ? header : '<span></span>'}
      <div class="msg">${content}</div>
      <img src="/avatar.svg" />
    </div>
  </body>
</html>`
