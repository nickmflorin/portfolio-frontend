var moment = require('moment')


export const formatMonthYear = (year, mth) => {
  const date = new Date(year, mth, 1);
  const mmt = moment(date);
  return mmt.format('MMMM YYYY')
}


export const formatDateRange = (start_year, start_month, end_year, end_month) => {
  var start_string = null;
  var end_string = null;

  if (!(start_year && start_month)){
    throw new Error("Both start_year and start_month must be defined.")
  }
  const start_date = new Date(start_year, start_month - 1, 1);
  const start_mmt = moment(start_date);

  if (end_year || end_month){
    if (!(end_year && end_month)){
      throw new Error("Both end_year and end_month must be defined.")
    }
    const end_date = new Date(end_year, end_month - 1, 1);
    const end_mmt = moment(end_date);

    const duration = moment.duration(end_mmt.diff(start_mmt)).asYears().toFixed(2)
    if (duration >= 0.25) {
        return `${start_mmt.format('MMMM YYYY')} - ${end_mmt.format('MMMM YYYY')} (${duration} years)`
    }
    return `${start_mmt.format('MMMM YYYY')} - ${end_mmt.format('MMMM YYYY')}`
  }
  else {
    const duration = moment.duration(moment().diff(start_mmt)).asYears().toFixed(2)
    if (duration >= 0.25) {
        return `${start_mmt.format('MMMM YYYY')} - Current (${duration} years)`
    }
    return `${start_mmt.format('MMMM YYYY')} - Current`
  }
}


export const pixelfy = (value) => {
  return `${value}px`;
}

export const urlify = (value) => {
  return 'url("' + value + '")'
}
