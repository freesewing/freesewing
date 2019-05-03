import React from "react";
import Button from "@material-ui/core/Button";
import { languages } from "@freesewing/i18n";

const LanguageChooser = props => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      height: "calc(100vh - 64px)",
      width: "100%"
    },
    chooser: {
      width: "100%",
      textAlign: "center",
      alignSelf: "center"
    },
    button: {
      margin: "1rem"
    }
  };

  const changeLanguage = lang => {
    props.setLanguage(lang);
    props.setDisplay("pattern");
  };

  return (
    <div style={styles.container}>
      <div style={styles.chooser}>
        {Object.keys(languages).map(lang => {
          return (
            <Button
              style={styles.button}
              key={lang}
              color="primary"
              size="large"
              variant="contained"
              onClick={() => changeLanguage(lang)}
            >
              {languages[lang]}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageChooser;
