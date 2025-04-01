import jwt from 'jsonwebtoken'

export function OidcController() {}

/*
 * We redirect to the frontend here so the user can login
 * or we can re-use the existing session
 */
OidcController.prototype.init = async (req, res, tools) => {
  try {
    // Get the interaction details from OIDC provider
    const details = await tools.oidcProvider.interactionDetails(req, res)

    // Check if this is a resumption (second time)
    const isResumption = details.result && details.result.login

    if (isResumption) {
      // This is a resumption, let the provider handle it
      return tools.oidcProvider.callback()(req, res, next)
    } else {
      // This is the initial interaction, redirect to frontend
      const redirectUrl = `https://freesewing.eu/oidc-flow/?uid=${details.uid}`
      return res.redirect(redirectUrl)
    }
  } catch (err) {
    console.error('Error in interaction endpoint:', err)
    res.status(500).send('Server Error')
  }
}

OidcController.prototype.login = async (req, res, tools) => {
  const data = {}
  try {
    // Look up the OIDC interaction record
    data.oidc = await tools.oidcProvider.interactionDetails(req, res)
    // Look up the user
    data.token = await jwt.verify(req.body.token, tools.config.jwt.secretOrKey, {
      issuer: tools.config.jwt.issuer,
    })
  } catch (err) {
    console.log(err)
  }

  // If we did not load the account, it failed
  //if (!data.account?.id) res.redirect(`https://freesewing.eu/oidc-failed`)

  // Looks good, prepare OIDC flow response
  const result = {
    login: {
      accountId: `${data.token._id}`,
    },
    consent: {
      // The user has already consented in the frontend by clicking "Allow"
      //scopes: data.oidc.params.scope.split(' '),
      rejectedScopes: [],
      rejectedClaims: [],
      claims: {
        // ID Token claims
        id_token: {
          email: null,
          email_verified: null,
          name: null,
          preferred_username: null,
          picture: null,
          bio: null,
          moderator: null,
          updated_at: null,
        },
        // Userinfo claims
        userinfo: {
          email: null,
          email_verified: null,
          name: null,
          preferred_username: null,
          bio: null,
          moderator: null,
          picture: null,
          updated_at: null,
        },
      },
    },
  }

  try {
    await tools.oidcProvider.interactionFinished(req, res, result, {
      mergeWithLastSubmission: false,
    })
  } catch (err) {
    console.error({ err })
    res.status(500).send('OIDC Server Error')
  }
}
