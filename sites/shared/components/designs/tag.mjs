import Link from 'next/link'
import { useTranslation } from 'next-i18next'

export const ns = ['tags']

export const DesignTag = ({ tag }) => {
  const { t } = useTranslation(['tags'])
  return (
    <Link
      className="badge badge-primary hover:badge-secondary hover:shadow font-medium"
      href={`/designs/tags/${tag}`}
    >
      {t(tag)}
    </Link>
  )
}
