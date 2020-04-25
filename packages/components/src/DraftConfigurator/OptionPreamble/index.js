import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import ResetIcon from '@material-ui/icons/SettingsBackupRestore'
import { injectIntl } from 'react-intl'

const OptionPreamble = ({
  intl,
  title,
  desc,
  dflt,
  designDflt,
  option,
  value,
  displayValue,
  displayFormat = 'node',
  sameButDifferent,
  expanded,
  toggleExpanded,
  reset,
  designReset
}) => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    left: {
      flexGrow: 1,
      margin: '0 0.5rem'
    },
    right: {
      margin: '0 5px 0 0 ',
      textAlign: 'right'
    }
  }

  const resetLabel = intl.formatMessage({
    id: 'app.restoreDefaults',
    defaultMessage: ' ♻️  '
  })
  const resetDesignLabel = intl.formatMessage({
    id: 'app.restoreDesignDefaults',
    defaultMessage: ' ♻️  '
  })
  const resetPatternLabel = intl.formatMessage({
    id: 'app.restorePatternDefaults',
    defaultMessage: ' ♻️  '
  })

  let pattern = false
  if (dflt !== designDflt) pattern = true
  let displayClass = value === dflt ? 'dflt' : 'custom'
  if (pattern && value === designDflt) displayClass = 'p-dflt'
  else if (pattern && sameButDifferent) displayClass = 'custom'
  let dspValue = <span className={displayClass}>{displayValue}</span>

  if (displayFormat === 'html')
    dspValue = <span className={displayClass} dangerouslySetInnerHTML={{ __html: displayValue }} />
  return (
    <React.Fragment>
      <div onClick={toggleExpanded} style={styles.container}>
        <div style={styles.left}>
          <RightIcon className={'icon-col-exp ' + (expanded ? 'expanded' : 'collapsed')} />
          {title}
        </div>
        <div style={styles.right}>{dspValue}</div>
      </div>
      <div className={expanded ? 'col-exp expanded' : 'col-exp collapsed'}>
        <div style={styles.container}>
          <div style={styles.left}>
            <p>{desc}</p>
          </div>
          <div style={styles.right}>
            {pattern ? (
              <IconButton
                title={resetDesignLabel}
                aria-label={resetDesignLabel}
                color="primary"
                disabled={value === designDflt ? true : false}
                onClick={designReset}
                className="mini-icon-btn pattern"
              >
                <ResetIcon />
              </IconButton>
            ) : null}
            <IconButton
              title={pattern ? resetPatternLabel : resetLabel}
              aria-label={pattern ? resetPatternLabel : resetLabel}
              color="primary"
              disabled={value === dflt && !sameButDifferent ? true : false}
              onClick={reset}
              className={'mini-icon-btn' + (pattern ? ' pattern' : '')}
            >
              <ResetIcon />
            </IconButton>
          </div>
        </div>
        {option}
      </div>
    </React.Fragment>
  )
}

export default injectIntl(OptionPreamble)
