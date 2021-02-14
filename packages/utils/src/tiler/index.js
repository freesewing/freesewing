import axios from 'axios'

function useTiler(baseURL = 'https://tiler.freesewing.org', timeout = 10000) {
  const api = axios.create({ baseURL, timeout })
  const tiler = {
    tile: (svg, format = 'pdf', size = 'a4', handle = false) =>
      api.post('/api', { svg, format, size, handle })
  }

  return tiler
}

export default useTiler
