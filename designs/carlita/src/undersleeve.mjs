import { underSleeve as carltonUnderSleeve } from '@freesewing/carlton'

// This does nothing but pass along carlton.undersleeve with dependencies
// hidden.  This part file is required to hide dependencies.  If we
// were to add the carlton.undersleeve directly in index.mjs, it would
// result in brian.front being not hidden.

function draftCarlitaUnderSleeve (part) {
  return part
}

export const underSleeve = {
  name: 'carlita.underSleeve',
  from: carltonUnderSleeve,
  hideDependencies: true,
  draft: draftCarlitaUnderSleeve,
}
