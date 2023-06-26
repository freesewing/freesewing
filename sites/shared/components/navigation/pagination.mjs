import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { LeftIcon, DoubleLeftIcon, RightIcon, DoubleRightIcon } from 'shared/components/icons.mjs'

const pageButtonClasses = 'btn btn-primary btn-ghost text-base leading-none'

const PageButton = ({ pageNum, label, title, hrefBuilder, visible = true }) => (
  <Link
    className={`${pageButtonClasses} ${visible ? 'join-item' : 'invisible'}`}
    href={hrefBuilder(pageNum)}
    title={title || label}
  >
    {label}
  </Link>
)

const defaultHrefBuilder = (pageNum) => `${pageNum}`

export const Pagination = ({ current, total, hrefBuilder = defaultHrefBuilder }) => {
  const { t } = useTranslation('common')
  const prevButtons = []
  const nextButtons = []

  const buttonProps = { hrefBuilder }
  for (let i = 1; i < 4; i++) {
    const isEnd = i === 3

    prevButtons.unshift(
      <PageButton
        key={`prev-${i}`}
        {...{
          pageNum: isEnd ? 1 : current - i,
          label: isEnd ? <DoubleLeftIcon /> : current - i,
          visible: current > i,
          ...buttonProps,
        }}
      />
    )

    nextButtons.push(
      <PageButton
        key={`next-${i}`}
        {...{
          pageNum: isEnd ? total : current + i,
          label: isEnd ? <DoubleRightIcon /> : current + i,
          visible: current < total + 1 - i,
          ...buttonProps,
        }}
      />
    )
  }
  return (
    <div className="flex justify-evenly items-center mt-8">
      <PageButton
        {...{
          pageNum: current - 1,
          label: <LeftIcon />,
          title: t('previous'),
          ...buttonProps,
        }}
      />
      <div className="flex items-center">
        {prevButtons}
        <span className={`text-primary text-xl mx-4`} disabled>
          {current}
        </span>
        {nextButtons}
      </div>
      <PageButton
        {...{
          pageNum: current + 1,
          label: <RightIcon />,
          title: t('next'),
          ...buttonProps,
        }}
      />
    </div>
  )
}
