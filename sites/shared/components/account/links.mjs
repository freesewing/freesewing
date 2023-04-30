import { useAccount } from 'shared/hooks/use-account.mjs'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { PageLink } from 'shared/components/page-link.mjs'
import { freeSewingConfig as conf } from 'shared/config/freesewing.config.mjs'

export const ns = ['account']

const Li = ({ children }) => <li className="inline">{children}</li>
const Spacer = () => <li className="inline px-1 opacity-60"> | </li>

const LinkList = ({ items, t, control, first = false }) => {
  const output = []
  if (first)
    output.push(
      <li key="first" className="inline pr-2">
        <b>{first}:</b>
      </li>
    )
  for (const [item, cscore] of Object.entries(items)) {
    if (cscore <= control)
      output.push(
        <Li key={`${item}-li`}>
          <PageLink href={`/account/${item}`} txt={t(item)} className="capitalize" />
        </Li>,
        <Spacer key={`${item}-spacer`} />
      )
  }

  return output.length > 1 ? <ul className="mt-4">{output.slice(0, -1)}</ul> : null
}

const actions = {
  reload: 4,
  export: 3,
  restrict: 4,
  disable: 4,
  remove: 2,
}

export const AccountLinks = () => {
  const { account, clear } = useAccount()
  const { t } = useTranslation(ns)

  const lprops = { t, control: account.control }

  return (
    <div className="w-full max-w-md">
      <Link className="btn btn-primary mb-2 w-full capitalize" href="/create">
        {t('newPattern')}
      </Link>
      <div className="flex flex-row gap-2">
        <Link className="btn btn-secondary grow capitalize" href="/account/sets">
          {t('newSet')}
        </Link>
        <button className="btn btn-warning btnoutline mb-2 capitalize" onClick={clear}>
          {t('signOut')}
        </button>
      </div>

      <ul className="mt-8">
        <li className="inline pr-2">
          <b>Quick links:</b>
        </li>
        <Li>
          <PageLink href="/profile" txt={t('yourProfile')} />{' '}
        </Li>
        <Spacer />
        <Li>
          <PageLink href="/account/patterns" txt={t('yourPatterns')} />{' '}
        </Li>
        <Spacer />
        <Li>
          <PageLink href="/account/sets" txt={t('yourSets')} />{' '}
        </Li>
      </ul>

      {Object.keys(conf.account.fields).map((section) => (
        <LinkList
          key={section}
          items={conf.account.fields[section]}
          first={t(section)}
          {...lprops}
        />
      ))}

      <LinkList items={actions} first={t('actions')} {...lprops} />
    </div>
  )
}
