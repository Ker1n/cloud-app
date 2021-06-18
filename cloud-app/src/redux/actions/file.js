import axios from "axios";
import {addFile, setFiles} from "../../redux/reducers/fileReducer";;

export function getFiles (dirId) { 
    return async dispatch =>  { 
        try {
            const response = await axios.get(`http://localhost:4004/api/files${dirId ? '?parent='+dirId : ''}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setFiles(response.data))
        } catch (error) {
            console.log(error.response.data.message);
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

            const response  = await axios.post("http://localhost:4004/api/files/upload", formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength) //del
                    if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(progress) //del
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