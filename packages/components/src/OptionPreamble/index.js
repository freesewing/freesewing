import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import ResetIcon from "@material-ui/icons/SettingsBackupRestore";
import HelpIcon from "@material-ui/icons/Help";
import { injectIntl } from "react-intl";
import ListSubheader from "@material-ui/core/ListSubheader";

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
    right: { margin: "0 0.5rem" }
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
      <div style={styles.container}>
        <div style={styles.left} onClick={props.toggleExpanded}>
          <h4 id={props.id}>{props.title}</h4>
        </div>
        <div style={styles.right}>
          <h4 className={props.value === props.dflt ? "po-dflt" : "po-custom"}>
            {props.displayValue}
          </h4>
        </div>
      </div>
      <div
        style={styles.container}
        className={expanded ? "expanded" : "collapsed"}
      >
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
          >
            <ResetIcon />
          </IconButton>
          <IconButton
            title={docsLabel}
            aria-label={docsLabel}
            color="primary"
            onClick={props.showHelp}
          >
            <HelpIcon />
          </IconButton>
        </div>
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
