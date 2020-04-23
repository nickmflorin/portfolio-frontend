export const strip = (value) => {
  value = value.replace(/(<([^>]+)>)/ig,"")
  value = value.replace('&#39;', "'")
  value = value.replace('&nbsp;', ' ')
  return value
}
