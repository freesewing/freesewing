import React from "react";
import PropTypes from "prop-types";
import Logo from "../../Logo";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "../../Icon";

const Welcome = props => {
  const styles = {
    container: {
      textAlign: "center",
      maxWidth: "500px",
      margin: "2vh auto"
    },
    title: {
      fontFamily: "Roboto Condensed"
    },
    button: {
      margin: "0.5rem"
    },
    bigButton: {
      margin: "0.5rem",
      width: "calc(100% - 1rem)"
    },
    footer: {
      fontFamily: "Roboto Condensed",
      position: "fixed",
      bottom: "10px",
      left: 0,
      width: "100%",
      fontSize: "90%"
    }
  };

  return (
    <React.Fragment>
      <div />
      <div className="fs-sa">
        <section style={styles.container}>
          <div>
            <Logo size={250} />
          </div>
          <h1 style={styles.title}>
            <FormattedMessage id="app.welcome" />
          </h1>
          <p>
            <FormattedMessage id="cfp.renderInBrowser" />
            <br />
            <FormattedMessage id="cfp.weWillReRender" />
          </p>
          <Button
            style={styles.bigButton}
            variant="contained"
            size="large"
            color="primary"
            onClick={() => props.setDisplay("draft")}
          >
            <FormattedMessage id="cfp.draftYourPattern" />
          </Button>
          <Button
            style={styles.bigButton}
            variant="contained"
            size="large"
            color="primary"
            onClick={() => props.setDisplay("sample")}
          >
            <FormattedMessage id="cfp.testYourPattern" />
          </Button>
        </section>
      </div>
      <div />
    </React.Fragment>
  );
};

export default Welcome;
