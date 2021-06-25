
import excel from '../assets/img/file/excel.png';
import exe from '../assets/img/file/exe.png';
import defaultFile from '../assets/img/file/file.png';
import folder from '../assets/img/file/folder.ico';
import image from '../assets/img/file/image.png';
import js from '../assets/img/file/javascript.png';
import music from '../assets/img/file/Music.png';
import ps from '../assets/img/file/ps.png';
import torrent from '../assets/img/file/torrent.png';
import txt from '../assets/img/file/txt.png';
import winrar from '../assets/img/file/WinRAR3.png';


export const typeIcon = (type) => { 
    let fileImage;
    switch (type) {
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

      return fileImage
}