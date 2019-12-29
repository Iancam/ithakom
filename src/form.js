import React from "react";
import { Cancel } from "./cancelIcon";
import { InputElement } from "./formManager/inputElement";
export const Form = ({ flash, setFlash, formSpec, onSubmit, stateManager }) => {
  return (
    <div>
      {flash && (
        <div
          className={`ba fixed pa3 ma1 f3 w-40 mw6 ${flash.color || "black"}`}
        >
          {flash.msg}
          <div className="fr" onClick={() => setFlash(undefined)}>
            <Cancel />
          </div>
        </div>
      )}
      <div className="ma6 mw5 center">
        <h1 className="f1">
          Become an Ithakan in {formSpec ? formSpec.length : "a few easy"}{" "}
          steps!
        </h1>
        <form>
          {formSpec &&
            formSpec.map(node => InputElement({ node, stateManager }))}
        </form>

        <button
          onClick={onSubmit}
          className="pa3 green avenir bg-black ml2 br-pill"
        >
          Submit that good good :)
        </button>
      </div>
    </div>
  );
};
