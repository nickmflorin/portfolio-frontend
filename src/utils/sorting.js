import _ from 'underscore'

export const sortByYearMonth = (items, yearParam, monthParam) => {
  var validate = (item) => {
    if (item[yearParam] === undefined || item[monthParam] === undefined) {
      throw Error(`Invalid parameter ${yearParam} or ${monthParam}.`)
    }
    else if (item[yearParam] === null || item[monthParam] === null) {
      if (item[yearParam] === null) {
        throw Error(`Found null value for parameter ${yearParam}.`)
      }
      throw Error(`Found null value for parameter ${monthParam}.`)
    };
  }
  _.each(items, validate)
  return _.sortBy(items, function(item){
    return new Date(item[yearParam], item[monthParam], 1)
  }).reverse()
}

export const sortExperienceEducation = (items) => {
  var ongoing = _.filter(items, item => item.current === true);
  var finished = _.filter(items, item => item.current === false);

  ongoing = sortByYearMonth(ongoing, 'start_year', 'start_month')
  finished = sortByYearMonth(finished, 'end_year', 'end_month')
  return ongoing.concat(finished)
}
