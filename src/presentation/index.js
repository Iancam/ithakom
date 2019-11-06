// Import React
import React from "react";
import { Deck, Slide, Heading } from "spectacle";
import createTheme from "spectacle/lib/themes/default";
import { useHumansData } from "./useHumansData";
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
const HumanSlide = props => {
  const { pic, name } = props.human;
  const ignored_answers = ["name", "date_submitted", "pic"];
  return (
    <Slide transition={["zoom"]} bgColor="primary" {...props}>
      <h1 className="mb4 f1">{name.answer}</h1>
      <div className="">
        <div className="fl">
          <img
            src={pic ? pic.answer : "/x"}
            alt={`${name.answer.split(" ")[0]}'s face is missing`}
          />
        </div>
        <div className="ml6 fr w-40 vh-75 overflow-scroll pr4 pb4 mb6">
          {Object.values(props.human)
            .filter(({ key }) => !ignored_answers.includes(key))
            .map(field => {
              return (
                <div className="db f6" key={name.answer + field.key}>
                  <span className="red">{field.key}:</span>
                  {"  "}
                  {field.answer}
                </div>
              );
            })}
        </div>
      </div>
    </Slide>
  );
};

export default Presentation = () => {
  const humans = useHumansData();

  const loadingSlide = (
    <Slide transition={["zoom"]} bgColor="red">
      <Heading>loading, bro</Heading>
    </Slide>
  );
  humans && console.log(humans, humans[0]);

  return (
    <Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme}>
      {humans
        ? humans.map(human => {
            return <HumanSlide key={human.name.answer} human={human} />;
          })
        : loadingSlide}
      {/* {slides || loadingSlide} */}
    </Deck>
  );
};
