import React from 'react';
import "./FileList.scss";

import { useSelector } from 'react-redux';
import { File } from './File/File';

export const FileList = () => {

    const {files} = useSelector(state => state.files)

    return ( 
        <div className="fileList">
            <div className="fileList__header">
                <div className="fileList__name">Name</div>
                <div className="fileList__date">Date</div>
                <div className="fileList__size">Size</div>
            </div>
            <div className="fileList_-body">
                {files.map(file => (<File file={file} key={file._id + Date.now()} />))}
            </div>
        </div>
    )
};
