import React from "react";
import "./Uploader.scss";

import { useSelector, useDispatch } from "react-redux";

import { UploadFile } from "./UploadFile";

import { hideUploader } from "../../../redux/reducers/uploadReducer";

export const Uploader = () => {
  const dispatch = useDispatch();
  const { isVisible, files } = useSelector((state) => state.upload);

  const isVisibleHandler = () => {
    dispatch(hideUploader());
  };


  return (
    <>
      {isVisible && (
        <div className="uploader">
          <div className="uploader__header">
            <div className="uploader__title">
              <div class="spinner">
                <div class="ball"></div>
                <p>DOWNLOADING</p>
              </div>
            </div>
            <div className="popup__close close-btn" onClick={isVisibleHandler}>
              <i className="far fa-times-circle"></i>
            </div>
          </div>
          {files.map((file) => (
            <UploadFile key={file.id} file={file} />
          ))}
        </div>
      )}
    </>
  );
};
