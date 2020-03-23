import React from 'react';
import styled from 'styled-components';
import _ from 'underscore'

import { Page } from 'pages/containers'
import { EducationItem } from 'components/item'
import { getEducation } from 'services'


var sortEducation = (items) => {
  var ongoing = _.filter(items, item => item.ongoing === true);
  var finished = _.filter(items, item => item.ongoing === false);
  ongoing = _.sortBy(ongoing, 'start_date').reverse()
  finished = _.sortBy(finished, 'end_date').reverse()
  return ongoing.concat(finished)
}

const EducationContainer = styled.div`
  text-align: center;
  margin: 20px auto 20px auto;
`

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
    var degree = `${item.degree}, ${item.major}`
    if(item.degree.charAt(item.degree.length - 1) === "."){
      degree = `${item.degree} ${item.major}`
    }
    return (
      <EducationItem
        key={item.id}
        id={item.id}
        logo={item.school.logo}
        title={degree}
        sub_title={item.school.name}
        description={item.description}
        location={`${item.school.city}, ${item.school.state}`}
        minor={item.minor && `Minor in ${item.minor}`}
        concentration={item.concentration && `Concentration in ${item.concentration}`}
        gpa={"4.00/4.00"}
      />
    )
  }
  render() {
    return (
      <Page header="Education">
        <EducationContainer>
          {this.state.items && this.state.items.map((item) => {
            return this.createItem(item)
          })}
        </EducationContainer>
      </Page>
    )
  }
}

export default Education;
