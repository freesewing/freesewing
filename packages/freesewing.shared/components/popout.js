import Icon from "@/shared/components/icon"
import { translator } from '@/shared/lib/i18n'

const colors = {
  note: 'accent',
  tip: 'secondary',
  warning: 'error',
  fixme: 'warning',
  link: 'info',
  related: 'info',
  none: '',
}

const Popout = (props) => {
  const t = translator(props.t)
  let type = 'none'
  for (const t in colors) {
    if (props[t]) type = t
  }
  const color = colors[type]

  return (
    <div className="relative my-4">
      <div className={`
        border-l-4 px-8 py-2 prose lg:prose-lg bg-opacity-5 shadow border-${color} bg-${color}`}>
        <div className={`font-bold opacity-50 uppercase`}>
          {t(type)}
        </div>
        <div className="py-1 first:mt-0 popout-content">{props.children}</div>
      </div>
    </div>
  )
}

export default Popout
