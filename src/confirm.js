import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
const IDStuff = ({ history }) => (
  <div className="measure mt6 ml6 f3">
    Your results have been saved with the id{" "}
    {(history.location.state && history.location.state.id) || (
      <span className="red">(no id!! lawls)</span>
    )}
    . Not that this means much to you... Yet
  </div>
);

export const Confirm = props => {
  const history = useHistory();
  console.log({ history: history.location.state, props });
  return (
    <div className="tc center mt5 ml6 f2 fw7">
      We've got it! We'll get 🎵Bach🎵 to you soon.
    </div>
  );
};
