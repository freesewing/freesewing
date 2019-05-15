import React from "react";
import PropTypes from "prop-types";

const Emblem = props => (
  <React.Fragment>
    <span className="emb">{props.t1}</span>
    <span className="lem">{props.t2}</span>
  </React.Fragment>
);

Emblem.propTypes = {
  t1: PropTypes.string,
  t2: PropTypes.string
};

Emblem.defaultProps = {
  t1: "Free",
  t2: "Sewing"
};

export default Emblem;
