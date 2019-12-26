import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import ResetIcon from '@material-ui/icons/SettingsBackupRestore'
import HelpIcon from '@material-ui/icons/Help'
import { injectIntl } from 'react-intl'

const OptionPreamble = props => {
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

  const resetLabel = props.intl.formatMessage({
    id: 'app.restoreDefaults',
    defaultMessage: ' ♻️  '
  })
  const resetDesignLabel = props.intl.formatMessage({
    id: 'app.restoreDesignDefaults',
    defaultMessage: ' ♻️  '
  })
  const resetPatternLabel = props.intl.formatMessage({
    id: 'app.restorePatternDefaults',
    defaultMessage: ' ♻️  '
  })
  const docsLabel = props.intl.formatMessage({
    id: 'app.docs',
    defaultMessage: ' 🤔 '
  })

  let pattern = false
  if (props.dflt !== props.designDflt) pattern = true
  let displayClass = props.value === props.dflt ? 'dflt' : 'custom'
  if (pattern && props.value === props.designDflt) displayClass = 'p-dflt'
  else if (pattern && props.sameButDifferent) displayClass = 'custom'
  let displayValue = <span className={displayClass}>{props.displayValue}</span>

  if (props.displayFormat === 'html')
    displayValue = (
      <span className={displayClass} dangerouslySetInnerHTML={{ __html: props.displayValue }} />
    )
  return (
    <React.Fragment>
      <div onClick={props.toggleExpanded} style={styles.container}>
        <div style={styles.left}>
          <RightIcon className={'icon-col-exp ' + (props.expanded ? 'expanded' : 'collapsed')} />
          {props.title}
        </div>
        <div style={styles.right}>{displayValue}</div>
      </div>
      <div className={props.expanded ? 'col-exp expanded' : 'col-exp collapsed'}>
        <div style={styles.container}>
          <div style={styles.left}>
            <p>{props.desc}</p>
          </div>
          <div style={styles.right}>
            {pattern ? (
              <IconButton
                title={resetDesignLabel}
                aria-label={resetDesignLabel}
                color="primary"
                disabled={props.value === props.designDflt ? true : false}
                onClick={props.designReset}
                className="mini-icon-btn pattern"
              >
                <ResetIcon />
              </IconButton>
            ) : null}
            <IconButton
              title={pattern ? resetPatternLabel : resetLabel}
              aria-label={pattern ? resetPatternLabel : resetLabel}
              color="primary"
              disabled={props.value === props.dflt && !props.sameButDifferent ? true : false}
              onClick={props.reset}
              className={'mini-icon-btn' + (pattern ? ' pattern' : '')}
            >
              <ResetIcon />
            </IconButton>
            {props.noDocs ? null : (
              <IconButton
                title={docsLabel}
                aria-label={docsLabel}
                color="primary"
                onClick={props.showHelp}
                className="mini-icon-btn"
              >
                <HelpIcon />
              </IconButton>
            )}
          </div>
        </div>
        {props.option}
      </div>
    </React.Fragment>
  )
}

OptionPreamble.propTypes = {
  dflt: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
    PropTypes.bool.isRequired
  ]),
  value: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
    PropTypes.bool.isRequired
  ]),
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
  reset: PropTypes.func.isRequired,
  showHelp: PropTypes.func.isRequired,
  expanded: PropTypes.bool,
  displayFormat: PropTypes.string
}

OptionPreamble.defaultProps = {
  displayFormat: 'node'
}

export default injectIntl(OptionPreamble)
