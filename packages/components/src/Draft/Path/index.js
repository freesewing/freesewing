import React, { useState } from "react";
import PropTypes from "prop-types";
import { getProps } from "../utils";

const Path = props => {
  if (!props.path.render) return null;
  return <path d={props.path.asPathstring()} {...getProps(props.path)} />;
};

Path.propTypes = {
  path: PropTypes.object.isRequired
};

export default Path;
