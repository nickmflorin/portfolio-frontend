import React from 'react';
import _ from 'underscore'

import getEducation from 'services/education'
import './education.scss'


class EducationItem extends React.Component {
  render() {
    const location = `${this.props.item.school.city}, ${this.props.item.school.state}`
    var degree = `${this.props.item.degree}, ${this.props.item.major}`
    if(this.props.item.degree.charAt(this.props.item.degree.length - 1) === "."){
      degree = `${this.props.item.degree} ${this.props.item.major}`
    }
    // TODO: Create an icon for logos that could not be loaded.
    return (
      <div className='education-item'>
        <div className='left-container'>
          <img className='image' alt="Could not Load" src={this.props.item.school.logo} />
        </div>
        <div className='right-container'>
          <p className='align-left degree'>{degree}</p>
          <p className='align-left school'>{this.props.item.school.name}</p>
          <p className='align-left location'>{location}</p>
          {this.props.item.minor &&
            <p className='align-left minor'>
              <span className='label'>Minor in </span>
              {this.props.item.minor}
            </p>
          }
          {this.props.item.minor &&
            <p className='align-left concentration'>
              <span className='label'>Concentration in </span>
              {this.props.item.concentration}
            </p>
          }
          {this.props.item.description &&
            <p className='align-left description'>
              {this.props.item.description}
            </p>
          }
        </div>
      </div>
    )
  }
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
      const ordered = _.sortBy(response, (item) => {
        return item.end_date
      }).reverse()
      self.setState({items: ordered})
    }).catch((error) => {
      console.log('There was an error loading education history.')
    })
  }
  render() {
    return (
      <div className="page-content">
      	<h2> Education </h2>
        <div className='education-items-content'>
          {this.state.items && this.state.items.map((item) => {
            return <EducationItem key={item.id} item={item} />
          })}
        </div>
      </div>
    )
  }
}

export default Education;
