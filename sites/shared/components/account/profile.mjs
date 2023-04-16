// Dependencies
import { useTranslation } from 'next-i18next'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import Link from 'next/link'
import Markdown from 'react-markdown'
import { HeartIcon } from 'shared/components/icons.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'

export const ns = ['account']

const Avatar = ({ img, app = false }) => (
  <div className={`mask mask-squircle bg-neutral z-10 ${app ? 'w-24' : 'w-full'}`}>
    <img
      src={img}
      onClick={
        app
          ? () =>
              app.setModal(
                <ModalWrapper app={app}>
                  <Avatar img={img} />
                </ModalWrapper>
              )
          : null
      }
      className={app ? 'hover:cursor-zoom-in' : 'hover:cursor-zoom-out'}
    />
  </div>
)

export const AccountProfile = ({ app }) => {
  const { account, setAccount, token } = useAccount()
  const { t } = useTranslation(ns)

  const toggleModal = () => {
    if (modal) setModal(false)
    else setModal(<img src={account.img} />)
  }

  if (!account) return null

  return (
    <div className="my-8">
      <div className="flex flex-row w-full justify-center">
        <Avatar img={account.img} app={app} />
        {!account.patron ? (
          <Link href="/patrons/join" className="z-20">
            <HeartIcon className="w-12 h-12 -ml-8 mt-2 stroke-base-100 fill-accent" stroke={1} />
          </Link>
        ) : null}
      </div>
      <h2 className="text-center">{account.username}</h2>
      <div className="flex flex-row">
        <div className="avatar -mt-6 -ml-8 flex flex-row items-end"></div>
      </div>
      <div className="max-w-full truncate">
        <Markdown>{account.bio}</Markdown>
      </div>
    </div>
  )
}
