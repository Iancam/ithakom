// Import React
import React, { useState } from "react";
import { Deck, Slide, Heading } from "spectacle";
import createTheme from "spectacle/lib/themes/default";
import { useServer } from "../data/useServer";
import { API_URI } from "../config";
import join from "url-join";
const theme = createTheme(
  {
    primary: "white",
    secondary: "#1F2022",
    tertiary: "#03A9FC",
    quaternary: "#CECECE"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);

const recRender = obj => {
  const isLeaf = typeof obj !== "object" && typeof obj !== "array";
  if (isLeaf) return obj;
  if (!Object.entries(obj).length) return "";
  return (
    <div>
      {Object.entries(obj).map(([key, value]) => `${key}: ${recRender(value)}`)}
    </div>
  );
};

const HumanSlide = props => {
  const { picture, name } = props.human;
  console.log(props.human);

  if (typeof name !== "string") {
    return null;
  }
  const ignored_answers = [
    "name",
    "date_submitted",
    "_id",
    "date_submitted",
    "sublet",
    "deposit",
    "smoking"
  ];
  return (
    <Slide transition={["zoom"]} bgColor="primary" {...props}>
      <h1 className="mb4 f1">{name}</h1>
      <div className="">
        <div className="fl">
          <img
            src={join(API_URI, "images", picture ? picture : "/x")}
            alt={`${name.split(" ")[0]}'s face is missing`}
          />
        </div>
        <div className="ml6 fr w-40 vh-75 overflow-scroll pr4 pb4 mb6">
          {Object.entries(props.human)
            .filter(([key]) => !ignored_answers.includes(key))
            .map(([key, value], i) => {
              typeof value === "object" && console.log(recRender(value));

              return (
                <div className="db f3" key={i}>
                  <span className="red">{key}:</span>
                  {recRender(value)}
                </div>
              );
            })}
        </div>
      </div>
    </Slide>
  );
};

export default () => {
  const [err, setErr] = useState();
  const humans =
    useServer("http://localhost:3000/api/guppies.ts", setErr) || undefined;
  const loadingSlide = (
    <Slide transition={["zoom"]} bgColor="red">
      <Heading>Queueing Enya, please hold </Heading>
    </Slide>
  );

  return (
    <Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme}>
      {humans
        ? humans
            .filter(({ name }) => {
              return typeof name === "string";
            })
            .map((human, i) => {
              return <HumanSlide key={i} human={human} />;
            })
        : loadingSlide}
    </Deck>
  );
};
