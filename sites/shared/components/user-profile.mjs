import { useContext } from 'react'
import { cloudflareImageUrl } from 'shared/utils.mjs'
import { Fingerprint } from 'shared/components/fingerprint.mjs'
import { Role } from 'shared/components/role.mjs'
import { Mdx } from 'shared/components/mdx/dynamic.mjs'
import { ModalContext } from 'shared/context/modal-context.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'

export const UserProfile = ({ user }) => {
  const { setModal } = useContext(ModalContext)
  const img = cloudflareImageUrl({ id: `uid-${user.ihash}` })

  return (
    <>
      <div className="text-center max-w-prose">
        <h3>{user.username}</h3>
        <button
          onClick={() =>
            setModal(
              <ModalWrapper>
                <div className="flex flex-col gap-2 items-center">
                  <img src={img} />
                  <b>{user.username}</b>
                </div>
              </ModalWrapper>
            )
          }
          className="w-52 h-52 rounded-full"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
          }}
        ></button>
        <div className="flex flex-row row-wrap items-center justify-center gap-2">
          <Fingerprint id={user.id} />
          <Role role={user.role} />
        </div>
      </div>
      {user.bio !== '--' ? <Mdx md={user.bio} /> : null}
    </>
  )
}
