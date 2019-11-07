import React from "react";

const Input_Element = ({ node, stateManager, styles = {} }) => {
  const { id, copy, type, parent } = node;
  !copy && console.warn("copy undefined, defaulting to id");
  const divClass = styles.container || "db mt3 ml3 ";
  const labelClass = styles.label || "db mb1 avenir gray fw7 measure";
  const inpClass = styles.input || "br2 ba pv2 ph3 black-50 b--gray glow";
  const setValue = stateManager(node, { value: " " });
  return (
    <div className={divClass} key={id}>
      <label htmlFor="name" className={labelClass}>
        {copy}
      </label>
      <input
        type={type}
        onChange={e => setValue(e.target.value)}
        className={inpClass}
        name={id}
      />
    </div>
  );
};
export const InputElement = Input_Element;
