import React from 'react';

import { getExperience } from 'services'
import { Page } from 'pages/containers'
import { ExperienceItem } from 'components/items'
import { sortExperienceEducation, formatDateRange } from 'utils'


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
      console.error('There was an error loading experience history.')
    })
  }
  render() {
    return (
      <Page header="Experience">
        {this.state.items && this.state.items.map((item) => {
          return <ExperienceItem key={item.id} {...item} />
        })}
      </Page>
    )
  }
}

export default Experience;
