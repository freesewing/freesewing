import { useTranslation } from 'next-i18next'
import { ClearIcon } from 'shared/components/icons.mjs'
import get from 'lodash.get'

const Triangle = ({ transform = 'translate(0,0)', fill = 'currentColor' }) => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    transform={transform}
    style={{ fill }}
    transform-origin="12 12"
    d="M1 12m9 3m-6 4h2c3 0 3 -3 3-3L9 3c-0-1.732 -2.25-2.6125 -3.325 -.77L2 16c-.77 1.333.192 3 1.732 3z"
  />
)

const Line = () => (
  <path strokeLinecap="round" strokeLinejoin="round" transform="translate(12, 2)" d="M0 0L0 20" />
)

const FlipIconInner = ({ x = 0, y = 0, rotate = 0, ...style }) => (
  <g transform={`translate(${x},${y}) rotate(${rotate})`} transform-origin="12 12" style={style}>
    <Triangle fill="none" transform="translate(0, 2.5)" />
    <path strokeLinecap="round" strokeLinejoin="round" transform="translate(12, 2)" d="M0 0L0 20" />
    <Line />
    <Triangle transform="scale(-1,1) translate(0,2.5)" />
  </g>
)

const RotateIconInner = ({ flipX = false }) => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
    transform={flipX ? 'scale(-1,1)' : ''}
    transform-origin="12 12"
  />
)

const rectSize = 24

const Button = ({ onClickCb, transform, Icon, children }) => {
  const _onClick = (event) => {
    event.stopPropagation()
    onClickCb(event)
  }

  return (
    <g className="svg-layout-button group" transform={transform}>
      <rect width={rectSize} height={rectSize} className="button" />
      <Icon />
      <text className="invisible group-hover:visible text-xl">{children}</text>
      <rect width={rectSize} height={rectSize} onClick={_onClick} className="fill-transparent" />
    </g>
  )
}

export const ShowButtonsToggle = ({ gist, layoutSetType, updateGist }) => {
  const { t } = useTranslation('workbench')
  const path = ['_state', 'layout', layoutSetType, 'showButtons']
  const showButtons = get(gist, path, true)
  const setShowButtons = () => updateGist(path, !showButtons)

  return (
    <label htmlFor="showButtons" className="label">
      <span className="mr-2">{t('showButtons')}</span>
      <input
        type="checkbox"
        className="toggle toggle-primary"
        checked={showButtons}
        onChange={setShowButtons}
      />
    </label>
  )
}

/** buttons for manipulating the part */
export const Buttons = ({ transform, flip, rotate, resetPart, rotate90 }) => {
  const { t } = useTranslation('workbench')
  return (
    <g transform={transform}>
      {rotate ? (
        <circle cx="0" cy="0" r="50" className="stroke-2xl muted" />
      ) : (
        <path d="M -50, 0 l 100,0 M 0,-50 l 0,100" className="stroke-2xl muted" />
      )}
      <Button
        onClickCb={resetPart}
        transform={`translate(${rectSize / -2}, ${rectSize / -2})`}
        Icon={() => <ClearIcon wrapped={false} />}
      >
        {t('toolbar.resetPart')}
      </Button>
      <Button
        onClickCb={() => rotate90(-1)}
        transform={`translate(${rectSize * -2.7}, ${rectSize / -2})`}
        Icon={RotateIconInner}
      >
        {t('toolbar.rotateCCW')}
      </Button>
      <Button
        onClickCb={() => flip('y')}
        transform={`translate(${rectSize * 0.6}, ${rectSize / -2})`}
        Icon={() => <FlipIconInner rotate="270" />}
      >
        {t('toolbar.flipY')}
      </Button>
      <Button
        onClickCb={() => flip('x')}
        transform={`translate(${rectSize * -1.6}, ${rectSize / -2})`}
        Icon={FlipIconInner}
      >
        {t('toolbar.flipX')}
      </Button>
      <Button
        onClickCb={() => rotate90()}
        transform={`translate(${rectSize * 1.7}, ${rectSize / -2})`}
        Icon={() => <RotateIconInner flipX={true} />}
      >
        {t('toolbar.rotateCW')}
      </Button>
    </g>
  )
}
