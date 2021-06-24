import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../redux/actions/file";

import { FileList } from "./FileList/FileList";
import { Popup } from "./Popup/Popup";
import { Uploader } from "./Uploader/Uploader";
import { Loader } from "../Elements/Loader/Loader";
import { BackgroundAnimation } from "../Elements/BackgroundAnimation";

import Back from "../../assets/img/disk/iconfinder_4829864_arrow_back_left_icon_512px.png";
import NewFolder from "../../assets/img/disk/PinClipart.com_folder-clipart-black-and_530330.png";

import "./Disk.scss";
import {
  setCurrentDir,
  setPopupDisplay,
} from "../../redux/reducers/fileReducer";
import { setFilesView } from "../../redux/reducers/appReducer";

import { NavBar } from "../navBar/NavBar";

export const Disk = () => {
  const dispatch = useDispatch();
  const { currentDir, dirStack } = useSelector((state) => state.files);
  const { loader } = useSelector((state) => state.app);
  const [dragEnter, setDragEnter] = React.useState(false);
  const [sort, setSort] = React.useState("type");

  React.useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  const dragEnterHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  };

  const dragLeaverHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  };

  const dropHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  };

  const showPopupHandler = () => {
    dispatch(setPopupDisplay("flex"));
  };

  const previousDirHandler = () => {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  };

  const fileUploadHandler = (event) => {
    const files = [...event.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  };

  if (loader === true) {
    return <Loader />;
  }

  return (
    <div className="disk">
      <NavBar />
      <div className="disk__container">
        <div className="disk__wrapper">
          <div className="disk__header">
            <div className="disk-header__right-row">
              <div
                className="right-row__arrow-back"
                onClick={previousDirHandler}
              >
                <i className="fas fa-long-arrow-alt-left"></i>
              </div>
              <div className="right-row__arrow-forward">
                <i class="fas fa-long-arrow-alt-right"></i>
              </div>
              <div className="right-row__new-folder" onClick={showPopupHandler}>
                <i className="fas fa-folder-plus"></i>
              </div>
              <div className="right-row__upload-file">
                <label htmlFor="disk__upload">
                  <i className="fas fa-file-upload"></i>
                </label>
                <input
                  multiple={true}
                  onChange={fileUploadHandler}
                  type="file"
                  id="disk__upload"
                  className="disk__upload-input"
                />
              </div>
            </div>
            <div className="disk-header__left-row">
              <div className="left-row__select-sort">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="custom-select" 
                >
                  <option value="name">Sort by name</option>
                  <option value="type">Sort by type</option>
                  <option value="date">Sort by date</option>
                </select>
              </div>
              <div className="left-row__select-table">
                <div
                  className="select-table__plate"
                  onClick={() => dispatch(setFilesView("list"))}
                >
                  <i class="fas fa-list"></i>
                </div>
                <div
                  className="select-table__list"
                  onClick={() => dispatch(setFilesView("plate"))}
                >
                  <i className="fas fa-th"></i>
                </div>
              </div>
            </div>
          </div>
          {!dragEnter ? (
            <div
              className="disk__body"
              onDragEnter={dragEnterHandler}
              onDragLeave={dragLeaverHandler}
              onDragOver={dragEnterHandler}
            >
              <FileList />
              <Popup />
              <Uploader />
              <div className="disk-body__bg-animation">
              <BackgroundAnimation />
              </div>
            </div>
          ) : (
            <div
              className="drop-area"
              onDrop={dropHandler}
              onDragEnter={dragEnterHandler}
              onDragLeave={dragLeaverHandler}
              onDragOver={dragEnterHandler}
            >
              <p><i class="fas fa-download"></i></p>
              Drop files here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// return (
//   !dragEnter ?
//   <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaverHandler} onDragOver={dragEnterHandler} >
//     <div className="disk__header">
//       <div className="disk__row">
//         <div className="disk__back" onClick={previousDirHandler}>
//           <img src={Back} alt="back" />
//         </div>
//         <div className="disk__create" onClick={showPopupHandler}>
//          <img src={NewFolder} alt="NewFolder" />
//         </div>
//         <div className="disk__upload">
//           <label htmlFor="disk__upload" className="disk__upload-label">upload file</label>
//           <input multiple={true} onChange={fileUploadHandler} type="file" id="disk__upload" className="disk__upload-input" />
//         </div>
//         <div className='disk__select-sort'>
//         <select value={sort} onChange={(e) => setSort(e.target.value)} className='disk_select' >
//           <option value="name">Sort by name</option>
//           <option value="type">Sort by type</option>
//           <option value="date">Sort by date</option>
//         </select>
//         </div>
//         <div className="disk__select-list">
//           <button className="disk__plate" onClick={()=>dispatch(setFilesView('plate'))}></button>
//           <button className="disk__list" onClick={()=>dispatch(setFilesView('list'))}></button>
//         </div>
//       </div>
//     </div>
//     <FileList />
//     <Popup />
//     <Uploader />
//   </div>
//   :
//   <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaverHandler} onDragOver={dragEnterHandler}>
//     Enter files here
//   </div>
// );
