import React from "react";
import "./FileList.scss";

import { useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import DragAndDrop from "../../../assets/img/disk/icon-drag-1.jpg";

import { File } from "./File/File";

export const FileList = () => {
  const { files } = useSelector((state) => state.files);
  const { view } = useSelector((state) => state.app);

  if (files.length === 0) {
    return (
      <div className="empty-folder__wrapper">
        <div className="empty-folder__element">
          <p>
            <img src={DragAndDrop} alt="d&p" />
          </p>
          Current folder is empty
        </div>
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className="fileList">
        <div className="fileList__header">
          <div className="fileList__name">Name</div>
          <div className="fileList__date">Date</div>
          <div className="fileList__size">Size</div>
        </div>
        <div className="fileList__body">
          <TransitionGroup>
            {files.map((file) => (
              <CSSTransition key={file._id} timeout={500} classNames={"file"}>
                <File file={file} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  }

  if (view === "plate") {
    return (
      <div className="files-plates__wrapper">
        <TransitionGroup>
          {files.map((file) => (
            <CSSTransition key={file._id} timeout={1000} classNames={"plates"}>
              <File file={file} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
};
