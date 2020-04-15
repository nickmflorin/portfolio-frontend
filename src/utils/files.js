import { IMAGE_EXTENSIONS } from 'config'


export const getFileExtension = (filename) => {
  return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
};

export const isImageFile = (file) => {
  var ext = getFileExtension(file)
  return (IMAGE_EXTENSIONS.indexOf(ext.toLowerCase()) !== -1)
};

export function getImageDimensions(file) {
  return new Promise (function (resolved, rejected) {
    var i = new Image()
    i.onload = function(){
      resolved({
        width: i.width,
        height: i.height,
        ratio: i.width/i.height,
        inverseRatio: i.height/i.width,
      })
    };
    i.src = file
  })
};

export function getBase64Encoded(url, callback) {
  return new Promise (function (resolved, rejected) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        resolved(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  })
}
