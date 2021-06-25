import React from "react";
import "./UploaderFile.scss";

import { removeUploadFile } from "../../../redux/reducers/uploadReducer";
import { useDispatch } from "react-redux";

import { validationFileName } from "../../../utils/validationFileName";


export const UploadFile = ({ file }) => {
  const dispatch = useDispatch();

  const removeUploadFileHandler = () => {
    dispatch(removeUploadFile(file.id));
  };

  let fileName = file.name;

  if(file.name.length >= 14) { 
  
      fileName = validationFileName(file.name, 14)
    
  }

  return (
    <div className="upload-file">
      <div className="upload-file__header">
        <div className="upload-file__name">{fileName}</div>
        <div
          className="popup__close close-element"
          onClick={removeUploadFileHandler}
        >
          <i className="fas fa-times-circle"></i>
        </div>
      </div>
      <div className="upload-file__progress-bar">
        <div
          className="upload-file__upload-bar"
          style={{ width: file.progress + "%" }}
        ></div>
        <div className="upload-file__percent">{file.progress}%</div>
      </div>
    </div>
  );
};
