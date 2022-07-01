import {useRef, forwardRef} from 'react'
import { Menu } from '@headlessui/react'
import Link from 'next/link'

export const Picker = ({Icon, className, title, iconOnly=false, children, isStatic=false}) => {

	return (<Menu as="div" className={`dropdown dropdown-end w-auto`}>
		<Menu.Button className={iconOnly
			? `btn btn-sm`
			: `m-0 btn btn-neutral flex flex-row gap-2 btn-outline
			md:btn-ghost
			hover:bg-neutral hover:border-neutral-content
			`}
			aria-label="Choose Theme">
			<Icon />
			{!iconOnly && <span>{title}</span>}
			</Menu.Button>
		<Menu.Items as="ul" className={`p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 ${className}`} static={isStatic}>
		 {children}
		</Menu.Items>
	</Menu>)
}

const itemClass = (active) => "btn btn-ghost " + (active ? 'bg-base-200' : '')

export const PickerLink = (props) => {
	return (<li role="menuitem">
		<Menu.Item>
			{({active}) => (<ForwardLink active={active} {...props}></ForwardLink>)}
		</Menu.Item>
	</li>)
}

const ForwardLink = forwardRef(({href, locale, active, children, ...rest}, ref) => (
	<Link href={href} locale={locale}>
  	<a className={itemClass(active)} {...rest} role={undefined} ref={ref}>
  		<span className="text-base-content">
    		{children}
  		</span>
  	</a>
	</Link>
))

export const PickerButton = ({onClick, children}) => {
	return (<Menu.Item as="li" onClick={onClick}>
    {({ active }) => (
      <button className={itemClass(active)}>
      	<span className="text-base-content">
      		{children}
      	</span>
      </button>
    )}
  </Menu.Item>)
}
