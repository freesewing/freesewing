const statusClasses = {
  2: 'bg-green-600 text-white',
  4: 'bg-orange-500 text-white',
  5: 'bg-red-600 text-white',
}

const StatusCode = ({ status }) => {
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

export default StatusCode
