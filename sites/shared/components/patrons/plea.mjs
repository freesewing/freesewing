import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useEffect, useState } from 'react'
import { Joost } from 'shared/components/joost.mjs'

export const ns = ['patrons']

export const Plea = () => {
  const { t } = useTranslation(ns)
  const { account } = useAccount()
  const [user, setUser] = useState(false)

  useEffect(() => {
    // Do this here to avoid hydration issues
    if (account.username) setUser(account.username)
  }, [account.username])

  return (
    <div className="md:pt-8 pb-8 lg:py-12 max-w-prose w-full m-auto">
      <h2 className="text-inherit mb-4">
        {user ? t('hiUsername', { username: user }) : t('hiFriend')}
        <span role="img"> 👋</span>
      </h2>
      {[1, 2, 3, 4, 5].map((i) => (
        <p className="text-inherit font-medium" key={i}>
          {t(`patrons:plead${i}`)}
        </p>
      ))}
      <Joost className="ml-12 -mt-8 w-32" />
    </div>
  )
}
