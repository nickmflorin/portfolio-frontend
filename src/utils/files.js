import _ from 'underscore'
import { IMAGE_EXTENSIONS } from 'config'


export const getFileExtension = (filename) => {
  return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
}

export const isImageFile = (file) => {
  var ext = getFileExtension(file)
  return (IMAGE_EXTENSIONS.indexOf(ext.toLowerCase()) !== -1)
}

export const onImageLoadError = (event) => {
  event.target.src = 'https://react.semantic-ui.com/images/wireframe/image.png'
}
