import React from 'react'
import "./UploaderFile.scss";

import { removeUploadFile } from "../../../redux/reducers/uploadReducer";


import { useSelector, useDispatch } from "react-redux";

export const UploadFile = ({file}) => {



    const dispatch = useDispatch();

    const removeUploadFileHandler = () => { 
        dispatch(removeUploadFile(file.id))
    }

    return (
        <div className="upload-file">
            <div className="upload-file__header">
                <div className="upload-file__name">
                    {file.name}
                </div>
                <button className="upload-file__remove" onClick={removeUploadFileHandler}>X</button>
            </div>
            <div className="upload-file__progress-bar">
                <div className="upload-file__upload-bar" style={{width: file.progress + "%"}}></div>
                <div className="upload-file__percent">
                    {file.progress}%
                </div>
            </div>
        </div>
    )
}
