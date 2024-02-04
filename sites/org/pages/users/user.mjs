import { NavigationContext } from 'shared/context/navigation-context.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge, getSearchParam } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useState, useEffect, useContext } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { Robot } from 'shared/components/robot/index.mjs'
import { UserProfile } from 'shared/components/user-profile.mjs'
import { Loading } from 'shared/components/spinner.mjs'

// Translation namespaces used on this page
const ns = nsMerge(authNs, pageNs, 'status')

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const UserPage = ({ page }) => {
  const { t } = useTranslation(ns)
  const backend = useBackend()

  const [id, setId] = useState()
  const [user, setUser] = useState(false)
  const { updateSiteNav } = useContext(NavigationContext)

  useEffect(() => {
    const loadUser = async () => {
      const result = await backend.getProfile(id)
      if (result.success && result.data) {
        setUser(result.data.profile)
        updateSiteNav(`user?id=${id}`, { t: result.data.profile.username, s: `user?id=${id}` })
      } else setId(false)
    }
    if (id && !user) loadUser()
  }, [id, user])

  useEffect(() => {
    const newId = getSearchParam('id')
    if (newId !== id) setId(newId)
  }, [id])

  if (!id)
    return (
      <PageWrapper {...page} title={`404: ${t('status:404')}`}>
        <div className="text-primary mdx max-w-prose text-base-content max-w-prose text-base xl:pl-4">
          <Robot pose="fail" className="text-base-content max-w-64 mx-auto my-8" />
        </div>
      </PageWrapper>
    )

  if (!user)
    return (
      <PageWrapper {...page} title={`${t('user')} #${id}`}>
        <Loading />
      </PageWrapper>
    )

  return (
    <PageWrapper
      {...page}
      title={user.username}
      crumbs={[{ title: 'test', slug: 'ssssssa' }]}
      path={[`uid-${id}`]}
    >
      <UserProfile user={user} />
    </PageWrapper>
  )
}

export default UserPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['users'],
      },
    },
  }
}
