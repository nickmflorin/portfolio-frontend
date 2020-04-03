export const formatMonthYear = (year, mth) => {
  const date = new Date(year, mth, 1);  // 2009-11-10
  const month = date.toLocaleString('default', { month: 'long' });
  return `${month} ${year}`
}


export const formatDateRange = (start_year, start_month, end_year, end_month) => {
  var start_string = null;
  var end_string = null;

  if (start_year || start_month){
    if (!(start_year && start_month)){
      throw Error(
        `Both the start year and the start month must be non-null and defined.`)
    }
    start_string = formatMonthYear(start_year, start_month - 1)
  }
  if (end_year || end_month){
    if (!(end_year && end_month)){
      throw Error(
        `Both the end year and the end month must be non-null and defined.`)
    }
    if(!start_string){
      throw Error(
          `The start year and month must be provided if the end year `
          `and month are provided.`)
    }
    end_string = formatMonthYear(end_year, end_month - 1)
  }

  // If the end_string is present, the start_string is guaranteed to be present.
  if (start_string) {
    if (end_string) {
      return `${start_string} - ${end_string}`
    }
    return `${start_string} - Current`
  }
  else {
    throw Error(
        `Could not construct a date range string with the provided years `
        `and months.`)
  }
}


export const pixelfy = (value) => {
  return `${value}px`;
}

export const urlify = (value) => {
  return 'url("' + value + '")'
}
