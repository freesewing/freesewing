export const buttonRow = {
  html: `
  <tr>
    <td align="left" class="sm-p-15px" style="padding-top: 25px">
      <table class="sm-w-full sm-mx-auto" border="0" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center" class="hover-bg-blue-600" style="border-radius: 2px; background-color: #262626">
            <a href="{{ actionUrl}}" target="_blank" class="sm-block sm-p-15px sm-border-0" style="text-decoration: none; border: 1px solid #000; display: inline-block; border-radius: 2px; padding: 15px 25px; font-size: 16px; font-weight: 700; color: #fff">{{ button }} &nbsp;&nbsp;&rarr;</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>`,
  text: `{{{ actionUrl }}}`,
}

export const closingRow = {
  html: `
  <tr>
    <td align="left" class="sm-p-15px" style="padding-top: 30px">
      <p style="margin: 0; font-size: 16px; line-height: 25px; color: #262626">
        {{{ closing }}}
        <br><br>
        {{{ greeting }}}
        <br>
        joost
        <br><br>
        PS: {{{ ps-pre-link}}}
        <a href="{{ supportUrl }}" target="_blank" style="text-decoration: underline; color: #262626">
          <b>{{{ ps-link}}}</b>
        </a> {{{ ps-post-link }}}
      </p>
    </td>
  </tr>`,
  text: `
{{{ closing }}}

{{{ greeting }}}
joost

PS: {{{ text-ps }}} : {{{ supportUrl }}}`,
}

export const newsletterClosingRow = {
  html: `
  <tr>
    <td align="left" class="sm-p-15px" style="padding-top: 30px">
      <p style="margin: 0; font-size: 16px; line-height: 25px; color: #262626">
        {{{ closing }}}
        <br><br>
        {{{ greeting }}}
        <br>
        joost
      </p>
    </td>
  </tr>`,
  text: `
{{{ closing }}}

{{{ greeting }}}
joost
`,
}

export const headingRow = {
  html: `
  <tr>
    <td align="left" class="sm-p-15px" style="padding-top: 30px">
      <h2 style="margin: 0; font-size: 30px; color: #525252">
        <a href="{{{ actionUrl }}}" target="_blank" style="text-decoration: none; color: #525252">
          {{{ heading }}}
        </a>
      </h2>
    </td>
  </tr>`,
  text: `
{{ heading }}
`,
}

export const lead1Row = {
  html: `
  <tr>
    <td align="left" class="sm-p-15px" style="padding-top: 15px">
      <p style="margin: 0; font-size: 16px; line-height: 25px; color: #262626">
        <a href="{{ actionUrl }}" target="_blank" style="text-decoration: none; color: #262626">
          <b>{{{ lead }}}</b>
        </a>
      </p>
    </td>
  </tr>`,
  text: `{{{ text-lead }}}
  {{{ actionUrl }}}
  `,
}

export const preLeadRow = {
  html: `
  <tr>
    <td align="left" class="sm-p-15px" style="padding-top: 15px">
      <p style="margin: 0; font-size: 16px; line-height: 25px; color: #262626">
        {{{ preLead }}}
        <br><br>
        <a href="{{ actionUrl }}" target="_blank" style="text-decoration: none; color: #262626">
          <b>{{{ lead }}}</b>
        </a>
      </p>
    </td>
  </tr>`,
  text: `{{{ preLead }}}
  {{{ text-lead }}}
  {{{ actionUrl }}}
  `,
}

export const wrap = {
  html: (body) => `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
  </style>
  <![endif]-->
  <title>{{ title }}</title>
  <style>
    .hover-bg-blue-600:hover {
      background-color: #2563eb !important
    }
    @media screen {
      .all-font-sans {
        font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif !important
      }
    }
    @media (max-width: 525px) {
      .sm-mx-auto {
        margin-left: auto !important;
        margin-right: auto !important
      }
      .sm-block {
        display: block !important
      }
      .sm-w-full {
        width: 100% !important
      }
      .sm-max-w-full {
        max-width: 100% !important
      }
      .sm-border-0 {
        border-width: 0px !important
      }
      .sm-p-15px {
        padding: 15px !important
      }
      .sm-py-10px {
        padding-top: 10px !important;
        padding-bottom: 10px !important
      }
    }
  </style>
  <style>
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: inherit !important;
    }
  </style>
</head>
<body style="word-break: break-word; -webkit-font-smoothing: antialiased; margin: 0; width: 100%; padding: 0">
  <div style="display: none">
    {{ intro }}
    &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
  </div>
  <div role="article" aria-roledescription="email" aria-label="{{ intro }}" lang="en">
    <table class="all-font-sans" style="width: 100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" class="sm-py-10px" style="background-color: #fff; padding: 10px 15px">
          <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
              <tr>
                <td align="center" valign="top" width="500">
                  <![endif]-->
          <table class="sm-w-full" style="width: 100%; max-width: 500px" border="0" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td>
                <table style="width: 100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td>
                      <table style="width: 100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      ${body}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
                </td>
              </tr>
            </table>
          <![endif]-->
        </td>
      </tr>
      <tr>
        <td align="center" style="background-color: #fff; padding-top: 16px; padding-bottom: 16px">
          <!--[if (gte mso 9)|(IE)]>
      <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
        <tr>
          <td align="center" valign="top" width="500">
            <![endif]-->
<table align="center" class="sm-max-w-full" style="width: 100%; max-width: 500px" border="0" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
    <td align="left" style="border-top: 1px solid #ddd; padding: 8px" ;>
      <p style="margin: 0; font-size: 14px; line-height: 24px; color: #868e96; text-align: center;">
        <a href="https://{{ website }}" target="_blank" style="text-decoration: underline; color: #868e96"><b>{{ website }}</b></a>
        <span style="font-size: 13px; color: #737373">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://freesewing.dev" target="_blank" style="text-decoration: underline; color: #868e96"><b>FreeSewing.dev</b></a>
        <span style="font-size: 13px; color: #737373">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://github.com/fresewing/freesewing" target="_blank" style="text-decoration: underline; color: #868e96"><b>GitHub.com/freesewing</b></a>
      </p>
      <p style="margin: 0; font-size: 12px; margin-top: 12px; line-height: 18px; color: #868e96; text-align: center;">
        {{ notMarketing }}
        <br>
        {{ seeWhy }}&nbsp;
        <a href="{{ urlWhy }}" target="_blank" style="text-decoration: underline; color: #868e96">{{ whyDidIGetThis }}</a>
        <br>
        <br>
        FreeSewing
        <br>
        67 Plantin en Moretuslei
        <br>
        Antwerp 2018
        <br>
        Belgium
      </p>
    </td>
  </tr>
</table>
            <!--[if (gte mso 9)|(IE)]>
          </td>
        </tr>
      </table>
    <![endif]-->
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`,
  text: (body) => `
${body}

--
FreeSewing
Plantin en Moretuslei 67
Antwerp 2018
Belgium

{{ website }} : {{{ urlWebsite }}}
Github : https://github.com/freesewing/freesewing
{{ whyDidIGetThis }} : {{{ whyUrl }}}
`,
}
