import React, { useState } from "react";
import PropTypes from "prop-types";

const Defs = props => <defs>{props.defs}</defs>;

Defs.propTypes = { defs: PropTypes.string };
Defs.defaultProps = { defs: "" };

export default Defs;
