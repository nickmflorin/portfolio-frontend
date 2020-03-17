import React from 'react';

import getExperience from 'services/experience'
import './experience.scss'


class ExperienceItem extends React.Component {
  render() {
    return (
      <div className='experience-item'>
        <p className='position'>{this.props.item.title}</p>
        <p className='company'>{this.props.item.company.name}</p>
        <p className='location'>{this.props.item.company.city} {this.props.item.company.state}</p>
      </div>
    )
  }
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
      self.setState({items: response})
      console.log(response)
    }).catch((error) => {
      console.log('There was an error loading experience history.')
    })
  }
  render() {
    return (
      <div className="page-content">
      	<h5> Experience </h5>
        {this.state.items && this.state.items.map((item) => {
          return <ExperienceItem key={item.id} item={item} />
        })}
      </div>
    )
  }
}

export default Experience;
