import { cloudflareImageUrl } from 'shared/utils.mjs'
import { Fingerprint } from 'shared/components/fingerprint.mjs'
import { Role } from 'shared/components/role.mjs'
import { Mdx } from 'shared/components/mdx/dynamic.mjs'

export const UserProfile = ({ user }) => (
  <>
    <div className="text-center max-w-prose">
      <img
        src={cloudflareImageUrl({ id: `uid-${user.ihash}` })}
        className="mx-auto max-w-96 shrink-0 grow-0 rounded-full shadow"
      />
      <div className="w-2/3 px-8">
        <h2 className="flex flex-row items-center justify-between w-full">
          {user.username}
          <Fingerprint id={user.id} />
          <Role role={user.role} />
          <span>{user.role}</span>
        </h2>
        <table>
          <thead>
            <tr>
              <th>k</th>
              <th>v</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.username}</td>
              <td>username</td>
            </tr>
          </tbody>
        </table>
      </div>
      <img
        src={cloudflareImageUrl({ id: `uid-${user.ihash}` })}
        className="w-1/3 shrink-0 grow-0 rounded-lg shadow"
      />
    </div>
    <Mdx md={user.bio} />
  </>
)
