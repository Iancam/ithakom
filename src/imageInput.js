import React, { useEffect, useState } from "react";
import Request from "superagent";
import { API_URI } from "./config";

export const ImageInput = props => {
  const { set } = props;
  console.log(set);

  const [state, setState] = useState({
    uploading: false,
    image: undefined,
    postUrl: undefined
  });
  const onChange = e => {
    const files = Array.from(e.target.files);
    setState({ uploading: true });
    Request.post(`${API_URI}/image.ts`)
      .type(files[0].name.split(".").pop())
      .then(response => response.body)
      .then(awsSignedPost => {
        let req = Request.post(awsSignedPost.url);
        console.log(awsSignedPost.fields);

        req.set({
          ...awsSignedPost.fields,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET"
        });
        for (const key in awsSignedPost.fields) {
          req.field(key, awsSignedPost.fields[key]);
        }
        req.attach("file", files[0], awsSignedPost.contentType).then(() => {
          set(awsSignedPost.fields.key);
          setState({ uploading: false });
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
