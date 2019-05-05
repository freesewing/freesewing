import React, { useState } from "react";
import PropTypes from "prop-types";

const Style = props => <style>{props.css}</style>;

Style.propTypes = { css: PropTypes.string };
Style.defaultProps = { css: "" };

export default Style;
