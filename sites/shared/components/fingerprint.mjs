import { FingerprintIcon } from 'shared/components/icons.mjs'

export const Fingerprint = ({ id }) => (
  <div className="text-sm font-medium badge badge-secondary mt-4 flex flex-row gap-2 px-3 py-3">
    <FingerprintIcon className="w-4 h-4" stroke={2} /> {id}
  </div>
)
