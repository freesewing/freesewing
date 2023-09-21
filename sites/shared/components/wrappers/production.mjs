import { isProduction } from 'shared/freesewing.config.mjs'

export const NotInProduction = ({ children }) => (isProduction ? null : children)
export const OnlyInProduction = ({ children }) => (isProduction ? children : null)
