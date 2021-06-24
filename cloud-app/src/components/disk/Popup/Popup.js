import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPopupDisplay } from '../../../redux/reducers/fileReducer';
import { createDir } from "../../../redux/actions/file";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Input } from "../../Elements/Input/Input";
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
        <TransitionGroup>
        <CSSTransition  classNames="popupPage" timeout={1000} >
        <div className="popup" onClick={displayHandler} style={{display:popupDisplay}}>
            <div className="popup__content" onClick={(e)=> e.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">
                    <i class="fas fa-file-signature"></i>
                    </div>
                    <div className="popup__close" onClick={displayHandler}>
                        <i className="far fa-times-circle"></i>
                    </div>
                </div>
                <Input className="popup-input__modefined"
                label={"folder name"}
                width={370}
                type="text"
                value={dirName}
                changeValue={setDirName}
                />
                <button className="popup__createFolder" onClick={createDirHandler}>
                    Create folder
                </button>
            </div>
        </div>
        </CSSTransition>
        </TransitionGroup>
    )
}
