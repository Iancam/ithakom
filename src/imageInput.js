import React, { useEffect, useState } from "react";
import request from "superagent";

export const ImageInput = props => {
  const onChange = e => {
    const files = Array.from(e.target.files);
    setState({ uploading: true });

    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file);
    });

    fetch(`${API_URL}/image-upload`, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(images => {
        setState({
          uploading: false,
          images
        });
      });
  };

  return;
};
