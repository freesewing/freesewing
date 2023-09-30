import { useTranslation } from 'next-i18next'
import { DateTime, Interval } from 'luxon'
import { capitalize } from 'shared/utils.mjs'

export const ns = ['timeago']

export const TimeAgo = ({ date }) => {
  const { t } = useTranslation('timeago')
  const i = Interval.fromDateTimes(DateTime.fromISO(date), DateTime.now())
    .toDuration(['hours', 'days', 'months', 'years'])
    .toObject()
  let ago = ''
  if (i.years < 1 && i.months < 1 && i.days < 1) {
    if (Math.round(i.hours) === 1 || Math.floor(i.hours) === 1) ago += `${t('oneHour')}`
    else if (Math.floor(i.hours) === 0) ago += `${t('lessThanAnHour')}`
    else ago += `${Math.floor(i.hours)} ${t('hours')}`
  } else if (i.years < 1 && i.months < 1) {
    if (Math.floor(i.days) === 1) ago += `${t('oneDay')}`
    else if (Math.floor(i.days) === 0) ago += `${t('lessThanADay')}`
  } else {
    if (i.years === 1) ago += `${i.years} ${t('year')}, `
    else if (i.years > 1) ago += `${i.years} ${t('years')}, `
    if (i.months === 1) ago += `${i.months} ${t('month')}`
    else if (i.months > 1) ago += `${i.months} ${t('months')}`
  }

  return capitalize(`${ago} ${t('ago')}`)
}
