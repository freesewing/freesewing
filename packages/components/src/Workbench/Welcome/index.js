import React from "react";
import Logo from "../../Logo";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";

const Welcome = props => {
  const styles = {
    container: {
      textAlign: "center",
      maxWidth: "500px",
      margin: "0 auto",
    },
    bigButton: {
      margin: "0.5rem",
      width: "calc(100% - 3rem)"
    },
  }

  return (
    <section style={styles.container}>
      <Logo size={200} />
      <h1>
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
  )
}

export default Welcome;
