import { freeSewingConfig } from 'shared/config/freesewing.config.mjs'

export const ns = ['status']

export const AccountStatus = ({ status }) => {
  const { name, color } = freeSewingConfig.statuses[status]

  return (
    <span className={``}>
      <span
        className={`text-xs uppercase bg-${color} rounded-l-lg pl-1 font-bold text-base-100 border border-2 border-solid border-${color}`}
      >
        status
      </span>
      <span
        className={`text-xs uppercase bg-base-100 text-${color} rounded-r-lg px-1 font-bold border border-2 border-solid border-${color}`}
      >
        {name}
      </span>
    </span>
  )
}
