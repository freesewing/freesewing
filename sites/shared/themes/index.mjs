// This is CJS because Tailwind does not (yet) support ESM
import { theme as light } from './light.mjs'
import { theme as dark } from './dark.mjs'
import { theme as hax0r } from './hax0r.mjs'
import { theme as lgbtq } from './lgbtq.mjs'
import { theme as pastel } from './pastel.mjs'
import { theme as aqua } from './aqua.mjs'
import { theme as monochrome } from './monochrome.mjs'

export const themes = {
  light,
  dark,
  aqua,
  hax0r,
  lgbtq,
  monochrome,
  pastel,
}

const themeToStripeTheme = (theme) => ({
  theme: theme.stripeTheme,
  variables: {
    borderRadius: theme['--rounded-box'],
    colorBackground: theme['base-100'],
    colorBackgroundText: theme['base-content'],
    colorDanger: theme.error,
    colorDangerText: theme['--btn-error-content'],
    colorIcon: theme.secondary,
    colorIconHover: theme['secondary-active'],
    colorPrimary: theme.secondary,
    colorPrimaryText: theme.secondary,
    colorSuccess: theme.success,
    colorSuccessText: theme['--btn-success-content'],
    colorText: theme['base-content'],
    colorTextPlaceholder: theme['base-content'],
    colorTextSecondary: theme['base-content'],
    colorWarning: theme.warning,
    colorWarningText: theme['--btn-warning-content'],
    fontFamily: theme.fontFamily,
    fontSizeBase: '1rem',
  },
})

export const stripe = {
  light: themeToStripeTheme(light),
  dark: themeToStripeTheme(dark),
  aqua: themeToStripeTheme(aqua),
  hax0r: themeToStripeTheme(hax0r),
  lgbtq: themeToStripeTheme(lgbtq),
  monochrome: themeToStripeTheme(monochrome),
  pastel: themeToStripeTheme(pastel),
}
