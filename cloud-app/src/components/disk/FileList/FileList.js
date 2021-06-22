import React from 'react';
import "./FileList.scss";

import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from "react-transition-group";


import { File } from './File/File';

export const FileList = () => {

    const {files} = useSelector(state => state.files)


    if(files.length === 0) { 
        return ( 
            <div className="empty-folder__wrapper">
                Current folder is empty
            </div>
        )
    }

    return ( 
        <div className="fileList">
            <div className="fileList__header">
                <div className="fileList__name">Name</div>
                <div className="fileList__date">Date</div>
                <div className="fileList__size">Size</div>
            </div>
            <div className="fileList__body">
                <TransitionGroup>
                    {files.map(file => (
                        <CSSTransition
                         key={file._id} 
                         timeout={2500}
                         classNames={'file'}
                         >
                            <File file={file}  />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        </div>
    )
};
