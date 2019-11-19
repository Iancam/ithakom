import React, { useEffect } from "react";

const RecursiveNode = ({ id, copy, value, type, children }, level) => {
  return (
    <div className="ma2 measure f6" key={id}>
      <div className="f5">{copy}</div>
      <p>{value || <span className="red">missing</span>}</p>
    </div>
  );
};

export const Review = ({ state }) => {
  return Object.values(state).map((node, key) => RecursiveNode({ ...node }));
};
