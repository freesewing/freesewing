import { UserModel } from '../models/user.mjs'
import { Provider } from 'oidc-provider'
import { getJwks } from './crypto.mjs'

/*
 * This will be called at startup
 */
export async function loadOidcProvider(tools) {
  // Don't continue if the provider is not enabled
  if (!tools.config.oidc?.provider) return

  // Convert the symmetric key used to sign JWTs to a JWKS object
  const jwks = await getJwks()

  // Extend config with key set and account lookup
  const config = {
    ...tools.config.oidc.provider,
    jwks,
    findAccount: (ctx, id) => findAccount(ctx, id, tools),
    loadExistingGrant,
  }

  // Instantiate OIDC provider
  tools.oidcProvider = new Provider('https://backend.freesewing.eu', config)

  // Somethow this is needed, don't ask me why because it's already in the config
  tools.oidcProvider.proxy = true

  // Add it to Express
  tools.app.use(tools.oidcProvider.callback())
}

async function findAccount(ctx, id, tools) {
  const User = new UserModel(tools)
  await User.read({ id: Number(id) })
  const account = User.asAccount()

  // Return account data and claims
  return {
    accountId: id,
    async claims(use, scope) {
      // sub claim is always returned
      const claims = { sub: id.toString() }

      // profile claim
      if (scope.includes('profile')) {
        claims.name = account.username
        claims.preferred_username = account.username
        ;(claims.picture = `https://imagedelivery.net/ouSuR9yY1bHt-fuAokSA5Q/uid-${account.ihash}/sq500`),
          (claims.updated_at = Math.floor(account.updatedAt.getTime() / 1000))
        claims.bio = account.bio
        claims.moderator = false
      }

      // email claim
      if (scope.includes('email')) {
        claims.email = account.email
        claims.email_verified = true
      }

      return claims
    },
  }
}

async function loadExistingGrant(ctx) {
  // Get details about the current request
  const grantId =
    ctx.oidc.result?.consent?.grantId || ctx.oidc.session?.grantIdFor(ctx.oidc.client.clientId)

  // If a grant already exists, return it
  if (grantId) return ctx.oidc.provider.Grant.find(grantId)

  // For first-party clients or when we want to auto-approve
  if (ctx.oidc.client.clientId === 'forum') {
    // Create a new grant
    const grant = new ctx.oidc.provider.Grant({
      clientId: ctx.oidc.client.clientId,
      accountId: ctx.oidc.session?.accountId || ctx.oidc.account?.accountId,
    })

    // Add the requested scopes
    if (ctx.oidc.params?.scope) {
      const requestedScopes = ctx.oidc.params.scope.split(' ')
      requestedScopes.forEach((scope) => {
        grant.addOIDCScope(scope)
      })
    }

    // Save the grant, then return
    await grant.save()

    return grant
  }

  return
}
