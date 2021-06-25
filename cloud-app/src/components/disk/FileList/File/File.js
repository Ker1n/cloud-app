import React from "react";
import moment from "moment";
import "./file.scss";

import { useDispatch, useSelector } from "react-redux";
import {pushToStack, setCurrentDir,} from "../../../../redux/reducers/fileReducer";
import { downloadFile, deleteFile } from "../../../../redux/actions/file";
import { sizeFormat } from "../../../../utils/sizeFormat";
import { validationFileName } from '../../../../utils/validationFileName';
import { validationDirName } from "../../../../utils/validatiorDirName"; 

import excel from '../../../../assets/img/file/excel.png';
import exe from '../../../../assets/img/file/exe.png';
import defaultFile from '../../../../assets/img/file/file.png';
import folder from '../../../../assets/img/file/folder.ico';
import image from '../../../../assets/img/file/image.png';
import js from '../../../../assets/img/file/javascript.png';
import music from '../../../../assets/img/file/Music.png';
import ps from '../../../../assets/img/file/ps.png';
import torrent from '../../../../assets/img/file/torrent.png';
import txt from '../../../../assets/img/file/txt.png';
import winrar from '../../../../assets/img/file/WinRAR3.png';





export const File = ({ file }) => {

  const dispatch = useDispatch();

  const { currentDir } = useSelector((state) => state.files);
  const { view } = useSelector((state) => state.app);

  let fileName = file.name;
  let fileImage;

  switch (file.type) {
    case 'dir':
    fileImage = folder;
      break;
    case 'xls':
    fileImage = excel;
      break;
    case 'exe':
    fileImage = exe;
      break;
    case 'png':
    fileImage = image;
      break;
    case 'jpg':
    fileImage = image;
      break;
    case 'svg':
    fileImage = image;
      break;
    case 'js':
    fileImage = js;
      break;
    case 'mp3':
    fileImage = music;
      break;
    case 'wav':
    fileImage = music;
      break;
    case 'psd':
    fileImage = ps;
      break;
    case 'torrent':
    fileImage = torrent;
      break;
    case 'txt':
    fileImage = txt;
      break;
    case 'zip':
    fileImage = winrar;
      break;
    case 'rar':
    fileImage = winrar;
      break;  
    default:
    fileImage = defaultFile;
      break;
  }



  if(file.name.length >= 18) { 
    if(file.type === 'dir') { 
      fileName = validationDirName(file.name, 18)
    } else { 
      fileName = validationFileName(file.name, 18)
    }
  }

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
          src={fileImage}
          alt="file"
          className="file-plate__image"
        />
        <div className="file-plate__name">
          {fileName}
        </div>
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
            onClick={() => alert("not working yet")}
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
          src={fileImage}
          alt="file"
          className="file__image"
        />
        <div className="file__name">{fileName}</div>
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
          onClick={() => alert("not working yet")}
        >
          <i className="fas fa-cogs"></i>
        </div>
      </div>
    );
  }
};
