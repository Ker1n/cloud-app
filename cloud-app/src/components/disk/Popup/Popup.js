import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPopupDisplay } from '../../../redux/reducers/fileReducer';

import { createDir } from "../../../redux/actions/file";
 
import "./Popup.scss";




export const Popup = () => {

    const [dirName, setDirName] = React.useState("");
    const {popupDisplay, currentDir} = useSelector(state => state.files);
    const dispatch = useDispatch();


    const displayHandler = () => { 
        dispatch(setPopupDisplay("none"));
    }

    const createDirHandler = () => { 
             dispatch(createDir(currentDir, dirName))
             dispatch(setPopupDisplay("none"));
             setDirName("")
    }
   
    return (
        <div className="popup" onClick={displayHandler} style={{display:popupDisplay}}>
            <div className="popup__content" onClick={(e)=> e.stopPropagation()}>
         
                <div className="popup__header">
                    <div className="popup__title">
                     
                    </div>
                    <div className="popup__close" onClick={displayHandler}>
                    </div>
                </div>
                <input type="text" className="popup__input" placeholder="Folder name" value={dirName} onChange={(e) => setDirName(e.target.value)} />
                <button className="popup__createFolder" onClick={createDirHandler}>
                    Create folder
                </button>
            </div>
        </div>
    )
}
