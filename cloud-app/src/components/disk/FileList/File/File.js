import React from 'react';
import moment from 'moment'
import './file.scss';

import { useDispatch,useSelector } from 'react-redux';

import DirImage from '../../../../assets/img/disk/icons8-documents-folder-40.png';
import FileImage from '../../../../assets/img/disk/icons8-file-48.png';
import { pushToStack, setCurrentDir } from '../../../../redux/reducers/fileReducer';
import { downloadFile } from '../../../../redux/actions/file';



export const File = ({file}) => {

    const dispatch = useDispatch()
    const {currentDir} = useSelector(state => state.files);


    const openDirHandler = (file) => { 
        if(file.type === 'dir') { 
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    }



    const downloadFileHandler = (event) => { 
        event.stopPropagation();
        downloadFile(file)  
    }

    return ( 
        <div className="file" onClick={()=>openDirHandler(file)}>
            <img src={file.type === 'dir' ? DirImage : FileImage} alt="file" className="file__image" />
            <div className="file__name">{file.name}</div>
            <div className="file__date">{moment(file.date).format('MMMM Do YYYY h:mm a')}</div>
            <div className="file__size">{file.size}</div>
            { (file.type !== 'dir') ? 
            <div className="file__download">
                <button className="file_btn-download"onClick={downloadFileHandler}>Download</button>
            </div> : null}
            <div className="file__delete">
                <button className="file_btn-delete">Delete</button>
            </div>
        </div>
    )
};
