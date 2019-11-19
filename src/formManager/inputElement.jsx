import React from "react";

export const InputWrapper = ({ children, styles = {}, copy, id }) => {
  const divClass = styles.container || "db mt3 ml3 ";
  const labelClass = styles.label || "db mb1 avenir gray fw7 measure";
  const textAreaLength = "measure h6";

  return (
    <div className={divClass} key={id}>
      <label className={labelClass}>{copy}</label>
      {children}
    </div>
  );
};

const parse = node => {
  const { id, copy, type, parent } = node;
  const ret = type.includes(",")
    ? {
        ...node,
        type: "selectMultiple",
        props: { options: type.split(",") }
      }
    : type.includes(";")
    ? {
        ...node,
        type: "select",
        props: { options: type.split(";") }
      }
    : node;
  return { ...ret };
};

const Input_Element = ({ node, stateManager, styles = {} }) => {
  const { set } = stateManager(node, { value: " " });
  const { id, copy, type, parent, props } = parse(node);
  const divClass = styles.container || "db mt3 ml3 ";

  const inpClass = styles.input || "br2 ba pv2 ph3 black-50 b--gray glow";
  !copy && console.warn("copy undefined, defaulting to id");
  const inputMapper = {
    text: props => {
      return <input type={type} name={id} {...props} />;
    },
    long: props => {
      const { className } = props;
      return (
        <textarea
          cols={72}
          rows={4}
          {...props}
          className={className}
        ></textarea>
      );
    },
    selectMultiple: props => {
      const { options } = props;
      return (
        <div className={divClass}>
          {options.map(option =>
            InputElement({
              stateManager,
              node: { id: option, copy: option, parent: node, type: "checkbox" }
            })
          )}
        </div>
      );
    },
    select: props => {
      const { options } = props;
      return (
        <select {...props} name={id}>
          {options.map((option, i) => (
            <option key={i}>{option}</option>
          ))}
        </select>
      );
    }
  };
  const Input = inputMapper[type] || inputMapper.text;

  return (
    <InputWrapper {...node}>
      {Input({
        ...props,
        className: inpClass,
        onChange: e => {
          set(e.target.value);
        }
      })}
    </InputWrapper>
  );
};
export const InputElement = Input_Element;
