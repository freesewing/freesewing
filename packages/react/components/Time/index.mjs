import React from 'react'
import { DateTime, Interval } from 'luxon'

const day = 86400000
const hour = 3600000
const minute = 60000
const second = 1000

export const DateAndTime = ({ iso }) => {
  const dt = DateTime.fromISO(iso)
  return dt.toLocaleString(DateTime.DATETIME_MED)
}

export const TimeForHumans = ({ iso, future = false }) => {
  const suffix = future ? 'from now' : 'ago'
  const dates = [DateTime.fromISO(iso), DateTime.now()]
  if (future) dates.reverse()
  const i = Interval.fromDateTimes(...dates)
    .toDuration(['minutes', 'hours', 'days', 'months', 'years'])
    .toObject()
  const years = Math.floor(i.years)
  const months = Math.floor(i.months)
  const days = Math.floor(i.days)
  const hours = Math.floor(i.hours)
  const minutes = Math.floor(i.minutes)
  if (years < 1 && months < 1 && days < 1 && hours < 1 && minutes < 1) return `seconds ${suffix}`
  else if (years < 1 && months < 1 && days < 1 && hours < 1)
    return minutes < 2 ? `one minute ${suffix}` : `${minutes} minutes ${suffix}`
  else if (i.years < 1 && i.months < 1 && i.days < 1)
    return hours < 2 ? `${hours * 60 + minutes} minutes ${suffix}` : `${hours} hours ${suffix}`
  else if (years < 1 && months < 1)
    return days < 2 ? `${days * 24 + hours} hours ${suffix}` : `${days} days ${suffix}`
  else if (years < 1)
    return months < 4 ? `${months} months and ${days} days ${suffix}` : `${months} months ${suffix}`
  if (years < 3) return `${years * 12 + i.months} months ${suffix}`
  return `${years} years ${suffix}`
}

export const TimeAgo = (props) => <TimeForHumans {...props} />
export const TimeToGo = (props) => <TimeForHumans {...props} future />

export const TimeAgoBrief = ({ time }) => {
  const d = Math.floor(Date.now() - time)
  if (d > day) return `${Math.floor(d / day)}d ago`
  if (d > hour) return `${Math.floor(d / hour)}h ago`
  if (d > minute * 2) return `${Math.floor(d / minute)}m ago`
  if (d > second) return `${Math.floor(d / second)}s  ago`
  return `${d}ms ago`
}

export const TimeToGoBrief = ({ time }) => {
  const d = Math.floor(time * 1000 - Date.now())
  if (d > day) return `${Math.floor(d / day)}d`
  if (d > hour) return `${Math.floor(d / hour)}h`
  if (d > minute * 2) return `${Math.floor(d / minute)}m`
  if (d > second) return `${Math.floor(d / second)}s`
  return `${d}s`
}
