export const ns = ['roles']

const colors = {
  user: 'primary',
  curator: 'secondary',
  bughunter: 'accent',
  support: 'warning',
  admin: 'error',
}

export const AccountRole = ({ role }) => {
  const color = colors[role]

  return (
    <span className={``}>
      <span
        className={`text-xs uppercase bg-${color} rounded-l-lg pl-1 font-bold text-base-100 border border-2 border-solid border-${color}`}
      >
        role
      </span>
      <span
        className={`text-xs uppercase bg-base-100 text-${color} rounded-r-lg px-1 font-bold border border-2 border-solid border-${color}`}
      >
        {role}
      </span>
    </span>
  )
}
