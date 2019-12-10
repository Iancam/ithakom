import React, { useEffect, useState } from "react";
import Request from "superagent";
import { API_URI } from "./config";

export const ImageInput = props => {
  const [state, setState] = useState({ uploading: false, image: undefined });
  const onChange = e => {
    const files = Array.from(e.target.files);
    console.log(files);

    setState({ uploading: true });
    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append(i, file);
    });
    Request.post(`${API_URI}/image.ts`)
      .send(formData)
      .then(res => {
        console.log(res);
        return res.body;
      })
      .then(image => {
        console.log("twasBrillig");
        console.log(image);

        setState({
          uploading: false,
          image
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      {state.image && (
        <img
          src={state.image}
          alt="again, the wriggly wrong thing went forth a wooined it all"
        />
      )}
      <input {...props} type="file" name="avatar" onChange={onChange} />
    </>
  );
};
