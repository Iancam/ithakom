import React, { useEffect, useState } from "react";
import request from "superagent";
import Presentation from "./presentation";
import { InputElement } from "./formManager/inputElement";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory
} from "react-router-dom";
import { useCSV } from "./data/useCSV";

import { usePathState } from "./formManager/stateManager";
import { Review } from "./review";
import { Cancel } from "./cancelIcon";
const questions = require("./data/questions.dsv");

const Form = ({ flash, setFlash, formSpec, onSubmit, stateManager }) => {
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

const Confirm = props => {
  const history = useHistory();
  console.log({ history: history.location.state, props });

  return (
    <div className="measure mt6 ml6 f3">
      Your results have been save with the id{" "}
      {(history.location.state && history.location.state.id) || (
        <span className="red">(no id!! lawls)</span>
      )}
      . Not that this means much to you... Yet
    </div>
  );
};

function App(props) {
  const [flash, setFlash] = useState();
  const history = useHistory();
  const formSpec = useCSV(questions, {
    header: true,
    delimiter: "::",
    transform: results => {
      return results.data;
    }
  });

  const { state, stateManager } = usePathState(5);
  const onSubmit = () => {
    return request
      .post("http://localhost:3000/api/guppies.ts")
      .send(state(n => n.value))
      .then(v => {
        return history.push("/confirm", v.body);
      })
      .catch(err => {
        setFlash({ msg: "Woops! something went wriggly", color: "red" });
        console.log(err);
      });
  };

  return (
    <Switch>
      {/* <Route path={"/present"}>
        <Presentation />
      </Route> */}
      <Route path={"/apply"}>
        <Form {...{ stateManager, flash, setFlash, formSpec, onSubmit }}></Form>
      </Route>
      <Route exact path={"/"}>
        <Form {...{ stateManager, flash, setFlash, formSpec, onSubmit }}></Form>
      </Route>
    </Switch>
  );
}

export default App;
