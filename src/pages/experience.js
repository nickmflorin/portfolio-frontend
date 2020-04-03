import React from 'react';

import { getAllExperience } from 'services'
import { Page } from 'pages/containers'
import { ExperienceItem } from 'components/items'
import { sortExperienceEducation, formatDateRange } from 'utils'


class Experience extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      loading: false,
    }
  }
  componentWillMount() {
    this.getExperience()
  }
  getExperience() {
    var self = this
    getAllExperience().then((response) => {
      const ordered = sortExperienceEducation(response)
      self.setState({items: ordered})
    }).catch((error) => {
      console.error('There was an error loading experience history.')
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  render() {
    return (
      <Page header="Experience" loading={this.state.loading}>
        <div>
          {this.state.items.map((item) => {
            return <ExperienceItem key={item.id} {...item} />
          })}
        </div>
      </Page>
    )
  }
}

export default Experience;
