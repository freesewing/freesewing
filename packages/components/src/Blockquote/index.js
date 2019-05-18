import React from "react";
import Icon from "../Icon";

const Blockquote = ({ type, children }) => {
  return (
    <blockquote className={type}>
      {children}
      <Icon icon={type} className={"icon " + type} />
    </blockquote>
  );
};

export default Blockquote;
