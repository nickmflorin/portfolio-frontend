import React from 'react';
import _ from 'underscore'

import getEducation from '../../services/education'


class EducationItem extends React.Component {
  render() {
    return (
      <p>
        {this.props.name}
      </p>
    )
  }
}

class Education extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div className="page-content">
      	<h5> Education </h5>
        {(this.props.items.map((item) => (
            <EducationItem
              key={item._id}
              name={item.name}
            />
        )))}
      </div>
    )
  }
}


export class Resume extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {education: []}
  }
  componentWillMount() {
    var self = this
    getEducation().then((response) => {
      self.setState({
          education: response,
      })
    }).catch((error) => {
      console.log('There was an error loading the education.')
      console.log(error)
    })
  }
  render() {
    return (
      <div className="page-content">
      	<h5> Resume </h5>
        {this.state.education &&
          (<Education items={this.state.education}/>)
        }
      </div>
    )
  }
}

export default Resume;
