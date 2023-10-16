---
title: MFA
---

Enable of disable Multi-Factor Authentication (MFA) on the User account.

- [Setup MFA](#setup-mfa)
- [Confirm MFA](#confirm-mfa)
- [Disable MFA](#disable-mfa)

## Endpoints

Enabling, confirming, and disabling MFA is all possible via this endpoint:

| Method    | Path | Authentication |
| --------: | :--- | :------------- |
| <Method post /> | `/account/mfa/jwt` | [JSON Web Token](/reference/backend/api/authentication#jwt-authentication) |
| <Method post /> | `/account/mfa/key` | [API Key & Secret](/reference/backend/api/authentication#key-authentication) |

## Setup MFA

### Request body

| Property    | Type     | Description |
| ----------: | :------- | :---------- |
| `mfa`       | `boolean`| Set to `true` to enable MFA |

### Response status codes

Possible status codes for this endpoints are:

| Status code | Description |
| ----------: | :---------- |
| <StatusCode status="201"/> | success |
| <StatusCode status="400"/> | the request was malformed |
| <StatusCode status="401"/> | authentication failed |
| <StatusCode status="403"/> | access denied |
| <StatusCode status="500"/> | server error |

<Note>
If the status code is not <StatusCode status="200" /> the `error` property
in the response body should indicate the nature of the problem.
</Note>

### Response body

| Value               | Type     | Description |
| -------------- | -------- | ----------- |
| `result`       | String | Either `success` or `error` |
| `error`        | String | Will give info on the nature of the error. Only set if an error occurred. |
| `mfa.secret`   | String | The shared secret for generating one-time password (OTP) tokens |
| `mfa.otpauth`  | String | The OTP Auth URI that is encoded in the QR code |
| `mfa.qrcode`   | String | SVG to display a QR code with the otpauth URI encoded |

<Tip>
##### Styling the SVG
The SVG returned by the backend uses `currentColor` for the QR code, so you can
style it with CSS if you embed it in the page.
</Tip>

### Example request

```js
const mfa = await axios.post(
  'https://backend.freesewing.org/account/mfa/jwt',
  { mfa: true },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)
```

### Example response
```200.json
{
  "result": "success",
  "mfa": {
    "secret": "KBTSKUKRDJPEGCZK",
    "otpauth": "otpauth://totp/FreeSewing:user-294?secret=KBTSKUKRDJPEGCZK&period=30&digits=6&algorithm=SHA1&issuer=FreeSewing",
    "qrcode": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 53 53\" shape-rendering=\"crispEdges\"><path fill=\"none\" d=\"M0 0h53v53H0z\"/><path stroke=\"currentColor\" d=\"M4 4.5h7m1 0h1m3 0h1m1 0h3m2 0h1m1 0h1m1 0h1m1 0h2m1 0h5m3 0h1m1 0h7M4 5.5h1m5 0h1m1 0h4m1 0h2m4 0h1m2 0h3m3 0h1m2 0h2m2 0h1m2 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h2m1 0h3m4 0h2m1 0h2m3 0h4m2 0h1m2 0h1m2 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m7 0h1m6 0h3m3 0h1m1 0h1m5 0h2m1 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h1m1 0h3m1 0h3m1 0h8m3 0h1m2 0h1m1 0h3m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m7 0h1m1 0h3m1 0h1m3 0h1m2 0h3m1 0h1m1 0h1m4 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M14 11.5h2m3 0h4m1 0h1m3 0h4m2 0h1m1 0h3m1 0h1M4 12.5h1m2 0h6m1 0h2m6 0h1m1 0h5m1 0h1m1 0h2m1 0h1m3 0h1m1 0h1m2 0h1m1 0h3M5 13.5h3m3 0h2m1 0h2m5 0h2m1 0h2m2 0h5m1 0h2m2 0h1m2 0h4m1 0h2M5 14.5h1m1 0h2m1 0h1m5 0h1m2 0h1m2 0h1m1 0h3m10 0h2m2 0h1m3 0h1m1 0h2M5 15.5h2m2 0h1m2 0h4m1 0h1m4 0h3m2 0h1m2 0h3m1 0h1m2 0h4m2 0h6M5 16.5h1m4 0h1m2 0h4m1 0h3m1 0h2m1 0h1m3 0h4m2 0h1m2 0h2m3 0h2M5 17.5h3m1 0h1m1 0h1m3 0h2m2 0h3m5 0h2m2 0h1m2 0h1m2 0h1m1 0h2m1 0h2m2 0h1M4 18.5h2m1 0h2m1 0h2m4 0h5m5 0h1m2 0h5m1 0h1m5 0h3m3 0h2M4 19.5h1m1 0h2m3 0h2m2 0h1m1 0h1m1 0h1m1 0h2m3 0h1m2 0h3m1 0h1m1 0h1m1 0h2m1 0h1m1 0h3m1 0h3M6 20.5h1m1 0h3m1 0h1m2 0h1m1 0h1m1 0h4m1 0h1m3 0h1m1 0h3m2 0h3m1 0h1m1 0h1m1 0h1m2 0h1M4 21.5h1m1 0h2m1 0h1m3 0h5m2 0h1m4 0h2m1 0h1m1 0h2m2 0h1m4 0h2m3 0h2m1 0h2M4 22.5h5m1 0h2m3 0h1m1 0h1m3 0h2m9 0h3m1 0h1m2 0h1m3 0h1m2 0h2M4 23.5h1m1 0h1m1 0h1m3 0h1m2 0h1m2 0h1m1 0h2m1 0h2m2 0h4m1 0h3m8 0h2M4 24.5h1m1 0h9m2 0h1m1 0h2m1 0h7m2 0h1m3 0h3m1 0h7M6 25.5h1m1 0h1m3 0h1m1 0h4m1 0h3m2 0h1m3 0h1m1 0h2m3 0h1m3 0h2m3 0h4M4 26.5h1m1 0h1m1 0h1m1 0h1m1 0h2m2 0h1m1 0h1m1 0h1m3 0h1m1 0h1m1 0h3m1 0h2m3 0h4m1 0h1m1 0h3m1 0h1M4 27.5h1m1 0h1m1 0h1m3 0h1m5 0h1m2 0h1m1 0h2m3 0h2m3 0h3m1 0h1m1 0h2m3 0h1m1 0h2M5 28.5h1m2 0h8m2 0h2m4 0h5m1 0h1m1 0h4m4 0h5M8 29.5h1m2 0h2m3 0h1m2 0h1m2 0h1m2 0h2m1 0h1m1 0h2m3 0h1m1 0h1m2 0h2m1 0h1m3 0h1M4 30.5h3m1 0h1m1 0h1m1 0h1m1 0h1m3 0h1m2 0h1m1 0h3m4 0h1m1 0h2m2 0h1m2 0h1m1 0h2m2 0h2M4 31.5h1m1 0h1m2 0h1m2 0h1m1 0h1m2 0h3m1 0h1m5 0h4m1 0h1m1 0h1m1 0h5m2 0h1m2 0h1M6 32.5h1m2 0h3m2 0h1m1 0h2m1 0h1m1 0h2m2 0h1m2 0h1m3 0h1m4 0h1m2 0h3m1 0h1M4 33.5h1m1 0h2m1 0h1m2 0h1m2 0h1m1 0h1m1 0h3m3 0h3m2 0h1m2 0h1m4 0h2m3 0h2m2 0h2M7 34.5h1m2 0h5m1 0h5m1 0h2m1 0h1m2 0h1m4 0h4m2 0h1m2 0h1m1 0h2m1 0h1M4 35.5h2m2 0h1m2 0h1m1 0h1m1 0h1m2 0h8m2 0h2m1 0h4m3 0h2m1 0h1m5 0h2M9 36.5h5m1 0h5m3 0h1m1 0h1m1 0h5m5 0h1m7 0h2M5 37.5h2m2 0h1m2 0h3m6 0h1m1 0h2m3 0h1m1 0h2m1 0h3m2 0h5m4 0h1M8 38.5h1m1 0h1m1 0h3m2 0h1m3 0h2m1 0h1m1 0h1m2 0h1m1 0h1m3 0h1m2 0h2m1 0h5M5 39.5h4m5 0h1m2 0h4m3 0h1m2 0h4m1 0h1m2 0h2m3 0h1m1 0h1m1 0h2M4 40.5h1m2 0h2m1 0h1m1 0h2m4 0h12m3 0h1m1 0h1m2 0h7m3 0h1M12 41.5h1m1 0h3m1 0h3m3 0h1m3 0h1m2 0h1m3 0h1m2 0h1m1 0h1m3 0h1m1 0h2M4 42.5h7m1 0h1m2 0h4m1 0h3m1 0h1m1 0h1m1 0h2m1 0h1m2 0h2m4 0h1m1 0h1m1 0h1m1 0h2M4 43.5h1m5 0h1m1 0h1m1 0h1m1 0h2m1 0h3m2 0h1m3 0h3m2 0h6m1 0h1m3 0h3M4 44.5h1m1 0h3m1 0h1m1 0h1m2 0h2m1 0h2m1 0h1m2 0h6m3 0h1m3 0h1m2 0h6m2 0h1M4 45.5h1m1 0h3m1 0h1m1 0h5m3 0h2m1 0h3m1 0h3m3 0h3m1 0h2m4 0h2m1 0h1m1 0h1M4 46.5h1m1 0h3m1 0h1m3 0h5m3 0h5m1 0h2m1 0h2m2 0h1m1 0h1m1 0h3m1 0h1m1 0h4M4 47.5h1m5 0h1m2 0h1m2 0h1m1 0h1m2 0h1m4 0h2m2 0h1m3 0h2m1 0h3m1 0h3m2 0h3M4 48.5h7m1 0h5m2 0h3m3 0h1m2 0h1m1 0h3m1 0h2m2 0h1m1 0h1m1 0h2m1 0h1\"/></svg>\n"
  }
}
```

## Confirm MFA

To confirm the MFA, we need to provide an MFA token to ensure the user can
generate them.

### Request body

| Property    | Type     | Description |
| ----------: | :------- | :---------- |
| `mfa`       | `boolean`| Must be set to `true` to confirm MFA |
| `secret`    | `boolean`| The secret returned when setting up MFA |
| `token`     | `boolean`| Must be set to `true` to confirm MFA |

### Response status codes

Possible status codes for this endpoints are:

| Status code | Description |
| ----------: | :---------- |
| <StatusCode status="201"/> | success |
| <StatusCode status="400"/> | the request was malformed |
| <StatusCode status="401"/> | authentication failed |
| <StatusCode status="403"/> | access denied |
| <StatusCode status="500"/> | server error |

<Note>
If the status code is not <StatusCode status="200" /> the `error` property
in the response body should indicate the nature of the problem.
</Note>

### Response body

| Value               | Type     | Description |
| -------------- | -------- | ----------- |
| `result`       | String | Either `success` or `error` |
| `error`        | String | Will give info on the nature of the error. Only set if an error occurred. |

### Example request

```js
import { authenticator } from '@otplib/preset-default'

const confirm = await axios.post(
  'https://backend.freesewing.org/account/mfa/jwt',
  {
    mfa: true,
    secret: mfa.secret,
    token: authenticator.generate(mfa.secret)
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)
```

### Example response

```200.json
{
  "result": "success",
}
```
## Disable MFA

To disable MFA, you need to provide both the account password and a valid token.

### Request body

| Property    | Type     | Description |
| ----------: | :------- | :---------- |
| `mfa`       | `boolean`| Must be set to `false` to disable MFA |
| `password`  | `boolean`| The User's password |
| `token`     | `boolean`| Must be set to `true` to confirm MFA |

### Response status codes

Possible status codes for this endpoints are:

| Status code | Description |
| ----------: | :---------- |
| <StatusCode status="201"/> | success |
| <StatusCode status="400"/> | the request was malformed |
| <StatusCode status="401"/> | authentication failed |
| <StatusCode status="403"/> | access denied |
| <StatusCode status="500"/> | server error |

<Note>
If the status code is not <StatusCode status="200" /> the `error` property
in the response body should indicate the nature of the problem.
</Note>

### Response body

| Value               | Type     | Description |
| -------------- | -------- | ----------- |
| `result`       | String | Either `success` or `error` |
| `error`        | String | Will give info on the nature of the error. Only set if an error occurred. |

### Example request

```js
import { authenticator } from '@otplib/preset-default'

const confirm = await axios.post(
  'https://backend.freesewing.org/account/mfa/jwt',
  {
    mfa: false,
    password: "I like big bewbs and I just can't lie",
    token: authenticator.generate(mfa.secret)
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)
```

### Example response

```200.json
{
  "result": "success",
}
```
