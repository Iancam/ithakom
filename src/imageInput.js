import React, { useEffect, useState } from "react";
import request from "superagent";
import { API_URI } from "./config";

export const ImageInput = props => {
  const [state, setState] = useState({ uploading: false, images: undefined });
  const onChange = e => {
    console.log(e);

    const files = Array.from(e.target.files);
    setState({ uploading: true });
    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append(i, file);
    });
    request
      .post(`${API_URI}/image.ts`)
      .send(formData)
      .then(res => res.body())
      .then(images => {
        setState({
          uploading: false,
          images
        });
      });
  };

  return (
    <input
      type="file"
      name="avatar"
      onChange={e => {
        console.log(e.target.files);
      }}
    />
  );
};
