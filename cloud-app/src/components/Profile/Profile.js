import React from 'react'

import {useDispatch} from "react-redux";
import { deleteAvatar, uploadAvatar } from '../../redux/actions/user';


export const Profile = () => {

    const dispatch = useDispatch();
    
    const avatarChangeHandler = (event) => { 
        const file = event.target.files[0];
        dispatch(uploadAvatar(file));
    }

    return (
        <div>
            <button onClick={()=>dispatch(deleteAvatar())}>Delete Avatar</button>
            <input accept="image/*" onChange={ avatarChangeHandler} type="file" placeholder="download avatar" />
        </div>
    )
}
