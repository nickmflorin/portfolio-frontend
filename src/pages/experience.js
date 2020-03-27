import React from 'react';
import styled from 'styled-components';
import _ from 'underscore'

import { getExperience } from 'services'
import { Page } from 'pages/containers'
import ExperienceItem from 'components/items/experience'
import { sortExperienceEducation, formatDateRange } from 'utils'


const ExperienceContainer = styled.div`
  text-align: center;
  margin: 20px auto 20px auto;
`


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
      const ordered = sortExperienceEducation(response)
      self.setState({items: ordered})
    }).catch((error) => {
      console.log('There was an error loading experience history.')
    })
  }
  render() {
    return (
      <Page header="Experience">
        <ExperienceContainer>
          {this.state.items && this.state.items.map((item) => {
            return <ExperienceItem key={item.id} {...item} />
          })}
        </ExperienceContainer>
      </Page>
    )
  }
}

export default Experience;
