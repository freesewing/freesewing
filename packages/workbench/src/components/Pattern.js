import React from "react";
import PropTypes from "prop-types";

const Pattern = props => {
  return (
    <React.Fragment>
      <span style={styles.free}>{props.text1}</span>
      <span style={styles.sewing}>{props.text2}</span>
    </React.Fragment>
  );
};

Pattern.propTypes = {
  pattern: PropTypes.string,
  freesewing: PropTypes.object
};

Pattern.defaultProps = {
};

export default Pattern;
