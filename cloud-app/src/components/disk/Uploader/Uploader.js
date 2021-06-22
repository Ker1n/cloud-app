import React from "react";
import "./Uploader.scss";

import { useSelector, useDispatch } from "react-redux";

import { UploadFile } from "./UploadFile";

import { hideUploader } from "../../../redux/reducers/uploadReducer";



export const Uploader = () => {


  const dispatch = useDispatch();

  const { isVisible, files } = useSelector((state) => state.upload);

  const isVisibleHandler = () => { 
    dispatch(hideUploader())
  }

  return (
    <>
      {isVisible && (
        <div className="uploader">
          <div className="uploader__header">
            <div className="uploader__title">Download</div>
            <button className="uploader__btn" onClick={isVisibleHandler}>X</button>
          </div>
          {files.map((file) => (
            <UploadFile key={file.id} file={file} />
          ))}
        </div>
      )}
    </>
  );
};
