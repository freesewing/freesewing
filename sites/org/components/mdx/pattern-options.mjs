import { configs } from 'shared/designs/index.js'
import { useTranslation } from 'next-i18next'
import PageLink from 'shared/components/link.js'

const renderOptions = (groups, pattern, t) => {
  const list = []
  for (let l1 in groups) {
    let children = []
    for (let l2 of groups[l1]) {
      if (typeof l2 === 'string') {
        children.push(
          <li key={pattern + l2}>
            <PageLink
              href={`/docs/patterns/${pattern}/options/${l2.toLowerCase()}`}
              txt={t(`o_${pattern}:${l2}.t`)}
            />
          </li>
        )
      } else {
        for (let l3 in l2) {
          let grandchildren = []
          for (let l4 of l2[l3]) {
            grandchildren.push(
              <li key={pattern + l4}>
                <PageLink
                  href={`/docs/patterns/${pattern}/options/${l4.toLowerCase()}`}
                  txt={t(`o_${pattern}:${l4}.t`)}
                />
              </li>
            )
          }
          children.push(
            <li key={pattern + l3}>
              <span className="capitalize font-bold">{t(`og:${l3}`)}</span>
              <ul className="list list-disc list-inside ml-4">{grandchildren}</ul>
            </li>
          )
        }
      }
    }
    list.push(
      <li key={pattern + l1}>
        <span className="capitalize font-bold">{t(`og:${l1}`)}</span>
        <ul className="list list-disc list-inside ml-4">{children}</ul>
      </li>
    )
  }

  return <ul className="list list-disc list-inside ml-4">{list}</ul>
}

const PatternOptions = ({ pattern, before = null, after = null }) => {
  const { t } = useTranslation([`o_${pattern}`, 'og'])

  return (
    <div>
      {before}
      {renderOptions(configs[pattern].optionGroups, pattern, t)}
      {after}
    </div>
  )
}

export default PatternOptions
