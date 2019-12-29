import React, { useEffect, useState } from "react";
import Request from "superagent";
import { API_URI } from "./config";

export const ImageInput = props => {
  const [state, setState] = useState({
    uploading: false,
    image: undefined,
    postUrl: undefined
  });
  // useEffect(() => {
  //   state.postUrl ||
  //     Request.get(`${API_URI}/image.ts`)
  //       .then(res => res.body)
  //       .then(postUrl => {
  //         console.log(postUrl);
  //         return setState({ ...state, postUrl });
  //       })
  //       .catch(err => setState({ state, postUrl: err }));
  // }, [state.postUrl]);
  const onChange = e => {
    const files = Array.from(e.target.files);
    console.log(files);
    setState({ uploading: true });
    Request.get(`${API_URI}/image.ts`)
      .type(files[0].name.split(".").pop())
      .then(response => response.body)
      .then(awsSignedPost => {
        console.log(awsSignedPost);
        let req = Request.post(awsSignedPost.url);
        req.set({
          ...awsSignedPost.fields,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET"
        });
        for (const key in awsSignedPost.fields) {
          console.log(key);

          req.field(key, awsSignedPost.fields[key]);
        }
        req
          .attach("file", files[0], awsSignedPost.contentType)
          .end((err, res) => {
            console.log(res.text);
            console.error(err);
          });
      })
      // .send(formData)
      // .then(res => {
      //   console.log(res);
      //   return res.body;
      // })
      // .then(image => {
      //   console.log("twasBrillig");
      //   console.log(image);

      //   setState({
      //     uploading: false,
      //     image
      //   });
      // })
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
