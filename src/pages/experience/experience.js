import React from 'react';

import getExperience from 'services/experience'
import './experience.scss'


class ExperienceItem extends React.Component {
  render() {
    const location = `${this.props.item.company.city}, ${this.props.item.company.state}`
    return (
      <div className='experience-item'>
        <div className='left-container'>
          <img className='image' alt="Could not Load" src={this.props.item.company.logo} />
        </div>
        <div className='right-container'>
          <p className='align-left position'>{this.props.item.title}</p>
          <p className='align-left company'>{this.props.item.company.name}</p>
          <p className='align-left location'>{location}</p>
        </div>
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
      	<h2> Experience </h2>
        <div className='experience-items-content'>
          {this.state.items && this.state.items.map((item) => {
            return <ExperienceItem key={item.id} item={item} />
          })}
        </div>
      </div>
    )
  }
}

export default Experience;
