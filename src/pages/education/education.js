import React from 'react';
import _ from 'underscore'

import getEducation from 'services/education'
import ResumeItem from 'components/item'
import './education.scss'


var sortEducation = (items) => {
  var ongoing = _.filter(items, item => item.ongoing === true);
  var finished = _.filter(items, item => item.ongoing === false);
  ongoing = _.sortBy(ongoing, 'start_date').reverse()
  finished = _.sortBy(finished, 'end_date').reverse()
  return ongoing.concat(finished)
}


class Education extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {items: []}
  }
  componentWillMount() {
    this.getEducation()
  }
  getEducation() {
    var self = this
    getEducation().then((response) => {
      const ordered = sortEducation(response)
      self.setState({items: ordered})
    }).catch((error) => {
      console.log('There was an error loading education history.')
    })
  }
  createItem(item){
    const location = `${item.school.city}, ${item.school.state}`
    var degree = `${item.degree}, ${item.major}`
    if(item.degree.charAt(item.degree.length - 1) === "."){
      degree = `${item.degree} ${item.major}`
    }
    var concentration = null;
    if (item.concentration) {
      concentration = `Concentration in ${item.concentration}`
    }
    var minor = null;
    if (item.minor) {
      minor = `Minor in ${item.minor}`
    }
    return (<ResumeItem
      key={item.id}
      id={item.id}
      logo={item.school.logo}
      title={degree}
      sub_title={item.school.name}
      sub_title_2={location}
      sub_title_3={minor}
      sub_title_4={concentration}
      description={item.description}
    />)
  }
  render() {
    return (
      <div className="page-content">
      	<h2> Education </h2>
        <div className='education-items-content'>
          {this.state.items && this.state.items.map((item) => {
            return this.createItem(item)
          })}
        </div>
      </div>
    )
  }
}

export default Education;
