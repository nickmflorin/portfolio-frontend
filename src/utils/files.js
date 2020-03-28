export const getFileExtension = (filename) => {
  return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
}
