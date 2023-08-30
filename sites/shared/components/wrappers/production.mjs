import { isProduction } from 'shared/freesewing.config.mjs'

export const ProductionWrapper = ({ only = false, not = true, children }) =>
  !not || only ? children : null
