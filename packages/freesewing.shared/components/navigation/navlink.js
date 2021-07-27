import Link from 'next/link'
import Icon from '@/shared/components/icon'

export const classes = {
  btn: `
  font-bold text-uppercase transition-colors duration-200 hover:text-secondary-content
  px-2 pb-0 w-full
  lg:w-auto lg:p-4`,
  btnWrap: 'flex flex-col items-center text-center',
  btnSpan: 'p-2 uppercase text-xs xl:text-base'
}

export const Mini = props => <span className={`hidden xl:inline lg:text-xs ${props.noOpacity ? '' : 'lg:opacity-60'}`}><br />{props.children}</span>

export const iconSize = 52

const NavLink = props => (
  <Link href={props.href}>
    <button
      className={`${classes.btn} ${props.menu ? 'btn-block my-2' : ''}`}
      title={props.title + ' ' + props.subtitle}
    >
      <div className={classes.btnWrap}>
        <Icon icon={props.icon} size={iconSize}/>
        <span className={classes.btnSpan}>
          {props.title}
          <Mini>{props.subtitle}</Mini>
        </span>
      </div>
    </button>
  </Link>
)

export default NavLink
