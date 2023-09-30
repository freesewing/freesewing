import { Popout } from 'shared/components/popout/index.mjs'
import { WebLink } from 'shared/components/link.mjs'

// This is how we skip the docs in the sde
export const DynamicOrgDocs = () => (
  <Popout note>
    <h5>The FreeSewing stand-alone development environment does not include documentation</h5>
    <p>
      Go to <WebLink href="https://freesewing.org/" txt="FreeSewing.org" /> if you want all features
      enabled.
    </p>
  </Popout>
)
