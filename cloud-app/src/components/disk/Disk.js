import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../redux/actions/file";

import { FileList } from "./FileList/FileList";
import { Popup } from "./Popup/Popup";

import Back from '../../assets/img/disk/iconfinder_4829864_arrow_back_left_icon_512px.png'
import NewFolder from '../../assets/img/disk/PinClipart.com_folder-clipart-black-and_530330.png'

import "./Disk.scss";
import {
  setCurrentDir,
  setPopupDisplay,
} from "../../redux/reducers/fileReducer";

export const Disk = () => {

  const dispatch = useDispatch();
  const { currentDir, dirStack } = useSelector((state) => state.files);
  const [dragEnter, setDragEnter] = React.useState(false);


  React.useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  const showPopupHandler = () => {
    dispatch(setPopupDisplay("flex"));
  };

  const previousDirHandler = () => {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  };

  const fileUploadHandler = (event) => { 
    const files = [...event.target.files];
    files.forEach(file => dispatch(uploadFile(file, currentDir)));
  }

  const dragEnterHandler = (event) => { 
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true)
  }

  const dragLeaverHandler = (event) => { 
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false)
  }

  const dropHandler = (event) => { 
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    files.forEach(file => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false)
  }

  return (
    !dragEnter ? 
    <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaverHandler} onDragOver={dragEnterHandler} >
      <div className="disk__header">
        <div className="disk__row">
          <div className="disk__back" onClick={previousDirHandler}>
            <img src={Back} alt="back" />
          </div>
          <div className="disk__create" onClick={showPopupHandler}>
           <img src={NewFolder} alt="NewFolder" />
          </div>
          <div className="disk__upload">
            <label htmlFor="disk__upload" className="disk__upload-label">upload file</label>
            <input multiple={true} onChange={fileUploadHandler} type="file" id="disk__upload" className="disk__upload-input" />
          </div>
        </div>
      </div>
      <FileList />
      <Popup />
    </div>
    : 
    <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaverHandler} onDragOver={dragEnterHandler}>
      Enter files here
    </div>
  );
};
