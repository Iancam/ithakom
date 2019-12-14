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
    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append(i, file);
    });
    Request.get(`${API_URI}/image.ts`)
      .type(files[0].name.split(".").pop())
      .then(response => response.body)
      .then(awsSignedPost => {
        console.log(awsSignedPost);
        Request.post(awsSignedPost.url)
          .set(awsSignedPost.fields)
          .then(re => console.log(re));
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
