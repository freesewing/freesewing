/**
 * A simple HTTP REST client
 *
 * We use this in the useBackend hook, but it's also possible to use this with
 * any other REST API.
 * This uses the fetch API, so it has no dependencies.
 * However, that means you cannot use this with a REST API using a non-trusted X.509 certificate, since fetch does not provide an escape hatch for that.
 * If that's your use-case, use Axios instead.
 *
 * @param {string} baseUrl - The base URL of the API that will be used as a prefix for all calls
 * @param {string} baseHeaders - Any headers to add to each request. Eg for authentication
 * @return {object} client - An object with get, post, and put methods
 */
export function RestClient(baseUrl = '', baseHeaders = {}) {
  this.baseUrl = baseUrl
  this.baseHeaders = baseHeaders

  this.delete = async function (url, headers, raw, log) {
    return withoutBody('DELETE', baseUrl + url, { ...baseHeaders, ...headers }, raw, log)
  }

  this.get = async function (url, headers, raw, log) {
    return withoutBody('GET', baseUrl + url, { ...baseHeaders, ...headers }, raw, log)
  }

  this.head = async function (url, headers, raw, log) {
    return withoutBody('HEAD', baseUrl + url, { ...baseHeaders, ...headers }, raw, log)
  }

  this.post = async function (url, data, headers, raw, log) {
    return withBody('POST', baseUrl + url, data, { ...baseHeaders, ...headers }, raw, log)
  }

  this.put = async function (url, data, headers, raw, log) {
    return withBody('PUT', baseUrl + url, data, { ...baseHeaders, headers }, raw, log)
  }

  return this
}

/*
 * General purpose method to call a REST API without a body (eg: GET or DELETE requests)
 *
 * @param {string} url - The URL to call
 * @param {object} headers - Any request headers to add
 * @param {bool} raw - Set this to something truthy to not parse the result as JSON
 * @param {function} log - Optional custom logging method to log errors
 * @return {response} array - An array with status code followed by either the result parse as JSON, the raw result, or false in case of trouble
 */
async function withoutBody(method = 'GET', url, headers = {}, raw = false, log = console.log) {
  let response
  try {
    response = await fetch(url, { method, headers })
  } catch (err) {
    if (log) console.log({ url, err })
  }

  if (!response) return [false, false]

  /*
   * Can we parse the response as JSON?
   */
  let body
  try {
    body = raw ? await response.text() : await response.json()
  } catch (err) {
    try {
      body = await response.text()
    } catch (err) {
      body = false
    }
  }

  return [response.status || false, body]
}

/*
 * General purpose method to call a REST API with a body (eg: PATCH, PUT, or POST requests)
 *
 * @param {url} string - The URL to call
 * @param {data} string - The data to send
 * @param {object} headers - Any request headers to add
 * @param {raw} string - Set this to something truthy to not parse the result as JSON
 * @param {function} log - Optional logging method to log errors
 * @return {response} array - An array with status code followed by either the result parse as JSON, the raw result, or false in case of trouble
 */
async function withBody(method = 'POST', url, data, headers, raw = false, log = console.log) {
  const request = { method, headers }
  if (data && typeof data === 'object' && Object.keys(data).length > 0) {
    request.body = JSON.stringify(data)
    request.headers['Content-Type'] = 'application/json'
  }

  let response
  try {
    response = await fetch(url, request)
  } catch (err) {
    if (log) log(err)
  }

  /*
   * Some status codes have no response body
   */
  if (response.status && [204].includes(response.status)) return [response.status, {}]
  else if (response.status && response.status < 400) {
    let data
    try {
      data = raw ? await response.text() : await response.json()
    } catch (err) {
      if (log) log(err)
      return raw ? [response.status, { err }] : [response.status, data]
    }
    return [response.status, data]
  }

  /*
   * If we end up here, status code is 400 or higher so it's an error
   * We still attempt to parse the body though
   */
  let body
  try {
    body = raw ? await response.text() : await response.json()
  } catch (err) {
    try {
      body = await response.text()
    } catch (err) {
      body = false
    }
  }

  return [response.status || 500, body]
}
