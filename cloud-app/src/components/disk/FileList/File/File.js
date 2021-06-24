import React from "react";
import moment from "moment";
import "./file.scss";

import { useDispatch, useSelector } from "react-redux";

import DirImage from "../../../../assets/img/disk/icons8-documents-folder-40.png";
import FileImage from "../../../../assets/img/disk/icons8-file-48.png";
import {
  pushToStack,
  setCurrentDir,
} from "../../../../redux/reducers/fileReducer";
import { downloadFile, deleteFile } from "../../../../redux/actions/file";
import { sizeFormat } from "../../../../utils/sizeFormat";

export const File = ({ file }) => {
  const dispatch = useDispatch();
  const { currentDir } = useSelector((state) => state.files);
  const { view } = useSelector((state) => state.app);

  const openDirHandler = (file) => {
    if (file.type === "dir") {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  };

  const downloadFileHandler = (event) => {
    event.stopPropagation();
    downloadFile(file);
  };

  const deleteClickHandler = (event) => {
    event.stopPropagation();
    dispatch(deleteFile(file));
  };

  if (view === "plate") {
    return (
      <div className="file-plate" onClick={() => openDirHandler(file)}>
        <img
          src={file.type === "dir" ? DirImage : FileImage}
          alt="file"
          className="file-plate__image"
        />
        <div className="file-plate__name">{file.name}</div>
        <div className="file-plate__buttons-row">
          {file.type !== "dir" ? (
            <div className="file-plate__download" onClick={downloadFileHandler}>
              <i className="fas fa-download"></i>
            </div>
          ) : null}
          <div className="file-plate__delete" onClick={deleteClickHandler}>
            <i className="fas fa-trash-alt"></i>
          </div>
          <div
            className="file-plate__config"
            onClick={() => console.log("Doesn't work yet")}
          >
            <i className="fas fa-cogs"></i>
          </div>
        </div>
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className="file" onClick={() => openDirHandler(file)}>
        <img
          src={file.type === "dir" ? DirImage : FileImage}
          alt="file"
          className="file__image"
        />
        <div className="file__name">{file.name}</div>
        <div className="file__date">
          {moment(file.date).format("MMMM Do YYYY h:mm a")}
        </div>
        <div className="file__size">{sizeFormat(file.size)}</div>
        {file.type !== "dir" ? (
          <div className="file__download" onClick={downloadFileHandler}>
            <i className="fas fa-download"></i>
          </div>
        ) : null}
        <div className="file__delete" onClick={deleteClickHandler}>
          <i className="fas fa-trash-alt"></i>
        </div>
        <div
          className="file__config"
          onClick={() => console.log("Doesn't work yet")}
        >
          <i className="fas fa-cogs"></i>
        </div>
      </div>
    );
  }
};
