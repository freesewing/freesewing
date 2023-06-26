import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { Spinner } from 'shared/components/spinner.mjs'

export const ModalSpinner = ({ color = 'warning' }) => (
  <ModalWrapper bare>
    <Spinner className={`w-24 h-24 text-${color} animate-spin`} />
  </ModalWrapper>
)
