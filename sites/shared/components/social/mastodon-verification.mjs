/*
 * List of users on FreeSewing.social that we verify
 */
const users = ['joost', 'freesewing', 'woutervw', 'tangerineshark']

/*
 * The way mastodon verifies accounts is that you need to put a
 * specifically formatted link in 'your website' (which means the
 * homepage.
 *
 * So for people with an account on FreeSewing (that want it and
 * that we feel are verified to us) we add these invisible links
 * for them with this component which is loaded on the homepage
 */
export const MastodonVerification = () => (
  <div className="hidden">
    {users.map((user) => (
      <a key={user} rel="me" href={`https://freesewing.social/@${user}`}>
        Mastodon
      </a>
    ))}
  </div>
)
