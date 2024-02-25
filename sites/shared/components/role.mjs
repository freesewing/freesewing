import { UserIcon } from 'shared/components/icons.mjs'

export const Role = ({ role }) => (
  <div className="text-sm font-medium badge badge-accent mt-4 flex flex-row gap-2 px-3 py-3 items-center">
    <UserIcon className="w-4 h-4" stroke={2} /> {role}
  </div>
)
