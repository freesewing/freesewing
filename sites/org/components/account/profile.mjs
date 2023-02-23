import Link from 'next/link'
import Markdown from 'react-markdown'
import { HeartIcon } from 'shared/components/icons.mjs'

export const AccountProfile = ({ app }) => {
  const { account, modal, setModal } = app

  const toggleModal = () => {
    if (modal) setModal(false)
    else setModal(<img src={account.img} />)
  }

  if (!account) return null

  return (
    <div className="my-8">
      <div className="flex flex-row w-full justify-center">
        <div className="w-24 mask mask-squircle bg-neutral z-10">
          <img src={account.img} onClick={toggleModal} className="hover:cursor-zoom-in" />
        </div>
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
