import React from "react";
import Presentation from "./presentation";
import { InputElement } from "./formManager/inputElement";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useCSV } from "./data/useCSV";
import { usePathState } from "./formManager/stateManager";
const questions = require("./data/questions.dsv");

function App() {
  const formSpec = useCSV(questions, {
    header: true,
    delimiter: "::",
    transform: results => {
      return results.data;
    }
  });
  const { values, stateManager } = usePathState(2);

  return (
    <Router>
      <Switch>
        <Route path={"/present"}>
          <Presentation />
        </Route>
        <Route path={"/form"}>
          {formSpec &&
            formSpec.map(node => InputElement({ node, stateManager }))}
          <button
            onClick={() => console.log(values())}
            className="pa3 green avenir bg-black ml2 br-pill"
          >
            Submit that good good :)
          </button>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
