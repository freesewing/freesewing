import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";
import ResetIcon from "@material-ui/icons/SettingsBackupRestore";
import HelpIcon from "@material-ui/icons/Help";
import { injectIntl } from "react-intl";

const OptionPreamble = props => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },
    left: {
      flexGrow: 1,
      margin: "0 0.5rem"
    },
    right: {
      margin: 0,
      textAlign: "right"
    }
  };

  const resetLabel = props.intl.formatMessage({
    id: "app.restoreDefaults",
    defaultMessage: " ♻️  "
  });
  const docsLabel = props.intl.formatMessage({
    id: "app.docs",
    defaultMessage: " 🤔 "
  });

  return (
    <React.Fragment>
      <h4 onClick={props.toggleExpanded} style={styles.container}>
        <div style={styles.left}>
          <DownIcon className={"icon-col-exp "+ (props.expanded ? "expanded" : "collapsed")}/>
          {props.title}
          </div>
        <div style={styles.right}>
          <span className={props.value === props.dflt ? "dflt" : "custom"}>
            {props.displayValue}
          </span>
        </div>
      </h4>
      <div className={props.expanded ? "col-exp expanded" : "col-exp collapsed"}>
        <div style={styles.container}>
          <div style={styles.left}>
            <p>{props.desc}</p>
          </div>
          <div style={styles.right}>
            <IconButton
              title={resetLabel}
              aria-label={resetLabel}
              color="primary"
              disabled={props.value === props.dflt ? true : false}
              onClick={props.reset}
              className="mini-icon-btn"
            >
              <ResetIcon />
            </IconButton>
            <IconButton
              title={docsLabel}
              aria-label={docsLabel}
              color="primary"
              onClick={props.showHelp}
              className="mini-icon-btn"
            >
              <HelpIcon />
            </IconButton>
          </div>
        </div>
        {props.option}
      </div>
    </React.Fragment>
  );
};

OptionPreamble.propTypes = {
  dflt: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired
  ]),
  value: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired
  ]),
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
  reset: PropTypes.func.isRequired,
  showHelp: PropTypes.func.isRequired,
  expanded: PropTypes.bool
};

export default injectIntl(OptionPreamble);
