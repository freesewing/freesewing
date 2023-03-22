const methodClasses = {
  get: 'bg-green-600 text-white',
  post: 'bg-sky-600 text-white',
  put: 'bg-orange-500 text-white',
  delete: 'bg-red-600 text-white',
}

export const HttpMethod = (props) => {
  let method = false
  for (const m in methodClasses) {
    if (!method && props[m]) method = m.toUpperCase()
  }

  return (
    <div
      className={`my-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full ${
        methodClasses[method.toLowerCase()]
      }`}
    >
      {method}
    </div>
  )
}

const statusClasses = {
  2: 'bg-green-600 text-white',
  4: 'bg-orange-500 text-white',
  5: 'bg-red-600 text-white',
}

export const HttpStatusCode = ({ status }) => {
  return (
    <div
      className={`my-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full ${
        statusClasses['' + status.slice(0, 1)]
      }`}
    >
      {status}
    </div>
  )
}
