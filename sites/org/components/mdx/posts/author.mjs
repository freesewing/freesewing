import { useState, useEffect } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useTranslation } from 'next-i18next'
import { cloudflareImageUrl } from 'shared/utils.mjs'
import { Loading } from 'shared/components/spinner.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { Mdx } from 'shared/components/mdx/dynamic.mjs'

export const Author = ({ author = '' }) => {
  const { t } = useTranslation(['posts'])
  const backend = useBackend()

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const loadAuthor = async () => {
      const result = await backend.getProfile(author)
      if (result.success && result.data.profile) setProfile(result.data.profile)
      else setProfile(false)
    }
    if (!profile) loadAuthor()
  }, [author])

  if (profile === null) return <Loading />
  if (profile === false)
    return (
      <Popout comment by="joost">
        <h5 id="maker">We cannot link authors/makers to their FreeSewing accounts (yet)</h5>
        <p>
          This is a known issue that I decided not to block the v3 release for. I will take care of
          this later.
        </p>
        <p>
          If you are the author of this post, you can reach out so I can correctly attribute it.
        </p>
      </Popout>
    )

  const img = cloudflareImageUrl({ id: profile.img, variant: 'sq500' })

  return (
    <div id="author" className="flex flex-col lg:flex-row m-auto p-2 items-center">
      <div className="bg-base-200 shadow w-40 h-40 rounded-full aspect-square hidden lg:block">
        <div
          className={`
          w-lg bg-cover bg-center rounded-full aspect-square
          hidden lg:block
        `}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>

      <div className="rounded-full aspect-square w-40 h-40 lg:hidden m-auto">
        <img
          className={`block w-full h-full mx-auto rounded-full`}
          src={img}
          alt={profile.username}
        />
      </div>
      <div
        className={`
        text-center p-2 px-4 rounded-r-lg bg-opacity-50
        lg:text-left
      `}
      >
        <p
          className="text-xl"
          dangerouslySetInnerHTML={{
            __html: t('xMadeThis', { x: profile.username }),
          }}
        />
        <div className="prose mdx">
          <Mdx md={profile.bio} />
        </div>
      </div>
    </div>
  )
}
