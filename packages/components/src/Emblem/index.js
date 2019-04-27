import React from "react";
import PropTypes from "prop-types";

const Emblem = props => (
  <React.Fragment>
    <span className="emb" style={{color: props.c1, fontSize: props.size+"px"}}>{props.t1}</span>
    <span className="lem" style={{color: props.c2, fontSize: props.size+"px"}}>{props.t2}</span>
  </React.Fragment>
);

Emblem.propTypes = {
  size: PropTypes.number,
  c1: PropTypes.string,
  c2: PropTypes.string,
  t1: PropTypes.string,
  t2: PropTypes.string,
};

Emblem.defaultProps = {
  size: 36,
  c1: "#111111",
  c2: "#111111",
  t1: "",
  t2: "",
};

export default Emblem;
