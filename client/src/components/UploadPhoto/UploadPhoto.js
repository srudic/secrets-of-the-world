import React, { useState, useEffect } from "react";

import style from "./UploadPhoto.module.css";

const UploadPhoto = (props) => {
  const [preview, setPreview] = useState();
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!props.selectedFile) {
      setPreview(undefined);
      return;
    }
    if (props.showStoredPhoto) {
      setPreview(`http://localhost:8080/${props.selectedFile}`);
    } else {
      const objectUrl = URL.createObjectURL(props.selectedFile);
      setPreview(objectUrl);
      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [props.selectedFile]);

  return (
    <div className={style.Photo}>
      <img
        src={preview}
        width={props.pictureWidth}
        height={props.pictureHeight}
      />

      <label>
        Upload photo
        <input type="file" onChange={props.onSelectFile} />
      </label>
    </div>
  );
};

export default UploadPhoto;
