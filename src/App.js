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
import { Form } from "./form";
import { usePathState } from "./formManager/stateManager";
import urljoin from "url-join";

import { Confirm } from "./confirm";
import { API_URI } from "./config";
const questions = require("./data/questions.dsv");

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
      .post(urljoin(API_URI, "guppies.ts"))
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
      <Route path={"/present"}>
        <Presentation />
      </Route>
      <Route path="/confirm">
        <Confirm></Confirm>
      </Route>
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
