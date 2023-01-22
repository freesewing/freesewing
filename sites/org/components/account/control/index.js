import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import useBackend from 'site/hooks/useBackend.js'
import Link from 'next/link'

const Button = ({ val, update, t, current }) => {
  const active = val === current

  if (current === 1 && val > 2) return null
  if (current === 2 && val > 3) return null
  if (current === 3 && val > 4) return null

  return (
    <button
      className={`
        btn w-full mt-2 btn-secondary
        flex flex-row flex-nowrap items-center gap-4 py-4 h-auto
        border border-secondary
        ${
          active
            ? ''
            : 'hover:bg-opacity-20 hover:bg-secondary btn-ghost border border-secondary hover:border hover:border-secondary'
        }
        ${current > 1 ? 'justify-start text-left' : 'justify-center text-center'}
      `}
      onClick={() => update(val)}
    >
      {current > 1 ? (
        <span
          className={`
          p-4 w-8 h-8 shrink-0 rounded-full text-center p-0 py-2
          ${active ? 'bg-base-100 text-secondary' : 'bg-secondary text-secondary-content'}
          `}
        >
          {val}
        </span>
      ) : null}
      <div
        className={`normal-case
        ${active ? 'text-secondary-content' : 'text-base-content'}
      `}
      >
        <span className="block text-lg leading-5">
          {current === 1 && val === 2 ? t('showMore') : t(`${val}t`)}
        </span>
        {current > 1 ? (
          <span className="block text-xs font-light normal-case pt-1">{t(`${val}d`)}</span>
        ) : null}
      </div>
    </button>
  )
}

export const namespaces = ['control']

const NextSteps = ({ val, t }) => {
  if (val === 1)
    return (
      <Link href="/" className="btn btn-primary w-full mt-12">
        {t('toHome')}
      </Link>
    )
  if (val === 2)
    return [
      <Link key={1} href="/welcome/units" className="btn btn-primary w-full mt-12">
        {t('setUnits')}
      </Link>,
      <Link key={2} href="/docs/guide" className="btn btn-primary btn-outline w-full mt-2">
        <span dangerouslySetInnerHTML={{ __html: t('gettingStarted') }} className="case-normal" />
      </Link>,
      <Link key={3} href="/" className="btn btn-ghost w-full mt-2">
        {t('toHome')}
      </Link>,
    ]
  if (val === 3)
    return [
      <Link key={1} href="/welcome/units" className="btn btn-primary w-full mt-12">
        {t('setUsername')}
      </Link>,
      <Link key={2} href="/welcome/units" className="btn btn-primary btn-outline w-full mt-2">
        {t('setUnits')}
      </Link>,
      <Link key={3} href="/docs/guide" className="btn btn-ghost w-full mt-2">
        <span dangerouslySetInnerHTML={{ __html: t('gettingStarted') }} className="case-normal" />
      </Link>,
    ]
  if (val === 4)
    return [
      <Link key={1} href="/welcome/mfa" className="btn btn-primary w-full mt-12 normal-case">
        {t('enableMfa')}
      </Link>,
      <div className="flex flex-row gap-2" key={2}>
        <Link href="/welcome/units" className="btn btn-primary btn-outline grow mt-2">
          {t('setUnits')}
        </Link>
        <Link href="/welcome/username" className="btn btn-primary btn-outline grow mt-2">
          {t('setUsername')}
        </Link>
      </div>,
      <Link key={3} href="/docs/guide" className="btn btn-ghost w-full mt-2">
        <span dangerouslySetInnerHTML={{ __html: t('gettingStarted') }} className="case-normal" />
      </Link>,
    ]
  if (val === 5)
    return [
      <Link href="/account" className="btn btn-primary w-full mt-12">
        {t('toYourAccount')}
      </Link>,
      <Link key={3} href="/docs/guide" className="btn btn-ghost w-full mt-2">
        <span dangerouslySetInnerHTML={{ __html: t('gettingStarted') }} className="case-normal" />
      </Link>,
    ]
}

export const ControlSettings = ({ app }) => {
  const backend = useBackend(app)
  const { t } = useTranslation(namespaces)
  const [selection, setSelection] = useState(app.account.control || 2)

  const update = async (control) => {
    if (control !== selection) {
      const result = await backend.updateAccount({ control })
      if (result) setSelection(control)
    }
  }

  return (
    <>
      {[1, 2, 3, 4, 5].map((val) => (
        <Button val={val} t={t} update={update} current={selection} />
      ))}
      <NextSteps val={selection} t={t} />
    </>
  )
}

export default ControlSettings
