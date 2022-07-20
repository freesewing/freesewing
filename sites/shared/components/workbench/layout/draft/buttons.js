import {FlipIconInner} from 'shared/components/icons/flip'
import {RotateIconInner} from 'shared/components/icons/rotate'
import {ClearIconInner} from 'shared/components/icons/clear'
import { useTranslation } from 'next-i18next'

const rectSize = 24

const Button = ({onClick, transform, Icon, children}) => {
  const _onClick = (event) => {
    event.stopPropagation();
    onClick(event);
  }

  return <g className="svg-layout-button group" transform={transform}>
    <rect width={rectSize} height={rectSize} className="button"/>
    <Icon />
    <text className="invisible group-hover:visible">{children}</text>
    <rect width={rectSize} height={rectSize} onClick={_onClick} className="fill-transparent"/>
  </g>}

/** buttons for manipulating the part */
const Buttons = ({ transform, flip, rotate, setRotate, resetPart, rotate90}) => {
  const {t} = useTranslation('workbench')
  return (
    <g transform={transform} >
      {rotate
        ? <circle cx="0" cy="0" r="50" className='stroke-2xl muted' />
        : <path d="M -50, 0 l 100,0 M 0,-50 l 0,100" className="stroke-2xl muted" />
      }
      <Button
        onClick={resetPart}
        transform={`translate(${rectSize/-2}, ${rectSize/-2})`}
        Icon={ClearIconInner}>
        {t('toolbar.resetPart')}
      </Button>
      <Button
        onClick={() => rotate90(-1)}
        transform={`translate(${rectSize* -2.7}, ${rectSize/-2})`}
        Icon={RotateIconInner}
        >
        {t('toolbar.rotateCCW')}
      </Button>
      <Button
        onClick={() => flip('y')}
        transform={`translate(${rectSize* 0.6}, ${rectSize/-2})`}
        Icon={() => <FlipIconInner rotate="270" />}
        >
        {t('toolbar.flipY')}
      </Button>
      <Button
        onClick={() => flip('x')}
        transform={`translate(${rectSize* -1.6}, ${rectSize/-2})`}
        Icon={FlipIconInner}>
        {t('toolbar.flipX')}
      </Button>
      <Button
        onClick={() => rotate90()}
        transform={`translate(${rectSize* 1.7}, ${rectSize/-2})`}
        Icon={() => <RotateIconInner flipX={true}/>}>
        {t('toolbar.rotateCW')}
      </Button>
    </g>
  )
}

export default Buttons
