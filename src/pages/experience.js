import React from 'react';
import styled from 'styled-components';
import _ from 'underscore'

import { getExperience } from 'services'
import { Page } from 'pages/containers'
import { ExperienceItem } from 'components/item'


var sortExperience = (items) => {
  var current = _.filter(items, item => item.current === true);
  var finished = _.filter(items, item => item.current === false);
  current = _.sortBy(current, 'start_date').reverse()
  finished = _.sortBy(finished, 'end_date').reverse()
  return current.concat(finished)
}

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
      const ordered = sortExperience(response)
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
            return (
              <ExperienceItem
                key={item.id}
                id={item.id}
                logo={item.company.logo}
                title={item.title}
                sub_title={item.company.name}
                location={`${item.company.city}, ${item.company.state}`}
              />
            )
          })}
        </ExperienceContainer>
      </Page>
    )
  }
}

export default Experience;
