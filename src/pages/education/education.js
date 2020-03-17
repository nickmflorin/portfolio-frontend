import React from 'react';

import getEducation from 'services/education'
import './education.scss'


class EducationItem extends React.Component {
  render() {
    return (
      <div className='education-item'>
        <p className='degree'>{this.props.item.degree}; {this.props.item.major}</p>
        <p className='school'>{this.props.item.school.name}</p>
        <p className='location'>{this.props.item.school.city} {this.props.item.school.state}</p>
        {this.props.item.minor &&
          <p className='minor'>
            <span className='label'>Minor in </span>
            {this.props.item.minor}
          </p>
        }
        {this.props.item.minor &&
          <p className='concentration'>
            <span className='label'>Concentration in </span>
            {this.props.item.concentration}
          </p>
        }
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
      self.setState({items: response})
    }).catch((error) => {
      console.log('There was an error loading education history.')
    })
  }
  render() {
    return (
      <div className="page-content">
      	<h5> Education </h5>
        {this.state.items && this.state.items.map((item) => {
          return <EducationItem key={item.id} item={item} />
        })}
      </div>
    )
  }
}

export default Education;
