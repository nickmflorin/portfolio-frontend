import React from 'react';
import _ from 'underscore'

import { getExperience } from 'services'
import ResumeItem from 'components/item'
import './experience.scss'


var sortExperience = (items) => {
  var current = _.filter(items, item => item.current === true);
  var finished = _.filter(items, item => item.current === false);
  current = _.sortBy(current, 'start_date').reverse()
  finished = _.sortBy(finished, 'end_date').reverse()
  return current.concat(finished)
}


class Experience extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {items: []}
  }
  componentWillMount() {
    this.getExperience()
  }
  getExperience() {
    var self = this
    getExperience().then((response) => {
      const ordered = sortExperience(response)
      self.setState({items: ordered})
    }).catch((error) => {
      console.log('There was an error loading experience history.')
    })
  }
  createItem(item){
    const location = `${item.company.city}, ${item.company.state}`
    return (<ResumeItem
      key={item.id}
      id={item.id}
      logo={item.company.logo}
      title={item.title}
      sub_title={item.company.name}
      sub_title_2={location}
    />)
  }
  render() {
    return (
      <div className="page-content">
      	<h2> Experience </h2>
        <div className='experience-items-content'>
          {this.state.items && this.state.items.map((item) => {
            return this.createItem(item)
          })}
        </div>
      </div>
    )
  }
}

export default Experience;
