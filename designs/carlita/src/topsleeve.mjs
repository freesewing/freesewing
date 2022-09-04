import { topSleeve as carltonTopSleeve } from '@freesewing/carlton'

// This does nothing but pass along carlton.topsleeve with dependencies
// hidden.  This part file is required to hide dependencies.  If we
// were to add the carlton.topsleeve directly in index.mjs, it would
// result in brian.front being not hidden.

function draftCarlitaTopSleeve (part) {
  return part
}

export const topSleeve = {
  name: 'carlita.topSleeve',
  from: carltonTopSleeve,
  hideDependencies: true,
  draft: draftCarlitaTopSleeve,
}
