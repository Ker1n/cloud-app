import axios from "axios";
import {addFile, setFiles, deleteFileAction} from "../../redux/reducers/fileReducer";
import { hideLoader, showLoader } from "../reducers/appReducer";
import { addUploadFile, changeUploadFile, showUploader } from "../reducers/uploadReducer";



export function getFiles (dirId, sort) { 

    return async dispatch =>  { 
        try {

            dispatch(showLoader());

            let url = `http://localhost:4004/api/files`;

            if (dirId) {
                url = `http://localhost:4004/api/files?parent=${dirId}`;
            }
            if (sort) {
                url = `http://localhost:4004/api/files?sort=${sort}`;
            }
            if (dirId && sort) {
                url = `http://localhost:4004/api/files?parent=${dirId}&sort=${sort}`;
            }   
            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setFiles(response.data))
        } catch (error) {
            console.log(error.response.data.message);
        } finally { 
                dispatch(hideLoader());
        }
    }
}

export function createDir (dirId, name) { 
    return async dispatch =>  { 
        try {
            const response = await axios.post("http://localhost:4004/api/files", {
                name,
                parent: dirId,
                type: 'dir'
            },{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addFile(response.data))
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
}

export function uploadFile (file,dirId ) { 
    return async dispatch => { 
        try {
            const formData = new FormData (); 
            formData.append('file', file);

            if (dirId) { 
                formData.append('parent', dirId)
            }

            const uploadFile = {name: file.name, progress: 0, id: Date.now() + file.name};

            dispatch(showUploader());
            dispatch(addUploadFile(uploadFile));

            const response  = await axios.post("http://localhost:4004/api/files/upload", formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength);
                        dispatch(changeUploadFile(uploadFile))
                    }
                }
            })
            dispatch(addFile(response.data))
        } catch (error) {
            console.log('upload file action', error)
        }
    }
}



export async function downloadFile (file) { 
    const response = await fetch(`http://localhost:4004/api/files/download?id=${file._id}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    
    if(response.status === 200) { 
      
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}

export function deleteFile(file) {
    return async dispatch => {
        try {
            const response = await axios.delete(`http://localhost:4004/api/files?id=${file._id}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteFileAction(file._id))
            console.log(response.data.message)
        } catch (e) {
            console.log(e?.response?.data?.message)
        }
    }
}

export function searchFiles (search) { 
    return async dispatch => { 
        try {
            const response = await axios.get(`http://localhost:4004/api/files/search?search=${search}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(response.data));
            
        } catch (error) {
            console.log("search file", error);
        } finally { 
            dispatch(hideLoader())
        }
    }
}
