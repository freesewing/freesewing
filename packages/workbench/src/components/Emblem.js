import React from "react";
import PropTypes from "prop-types";

const Emblem = props => {
  const font = {
    fontFamily: "'Roboto Condensed', sans-serif",
    fontSize: props.size,
    fontWeight: 900,
  }
  const styles = {
    free: {
      ...font,
      color: props.color1,
      letterSpacing: props.size/-40+"px",
    },
    sewing: {
      ...font,
      color: props.color2,
      letterSpacing: props.size/-20+"px",
    },
  }

  return (
    <React.Fragment>
      <span style={styles.free}>{props.text1}</span>
      <span style={styles.sewing}>{props.text2}</span>
    </React.Fragment>
  );
};

Emblem.propTypes = {
  size: PropTypes.number,
  color1: PropTypes.string,
  color2: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
};

Emblem.defaultProps = {
  size: 24,
  color1: "#111111",
  color2: "#111111",
  text1: "",
  text2: ""
};

export default Emblem;
