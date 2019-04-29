import React, { useState } from "react";
import PropTypes from "prop-types";
import { withGist } from "@freesewing/components";

const Workbench = props => {
  const [gist, setGist] = useState(props.gist.get);
  const [expanded, setExpanded] = useState([]);

  const toggleGroup = group => {
    let shown = expanded.slice(0);
    let index = shown.indexOf(group);
    if (index === -1) shown.push(group);
    else shown.splice(index, 1);
    setExpanded(shown);
  };

  return (
    <ul className="nav l1">
      <li>
        <h2>hi</h2>
      </li>
    </ul>
  );
};

Workbench.propTypes = {
  pattern: PropTypes.oneOf(patternList),
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired
};

Workbench.defaultProps = {};

export default withGist(Workbench, { gist: {}, store: "yes" });
