import React from 'react';

import { Page } from 'pages/containers'
import { EducationItem } from 'components/items'
import { getEducation } from 'services'
import { sortExperienceEducation, formatDateRange } from 'utils'


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
      const ordered = sortExperienceEducation(response)
      self.setState({items: ordered})
    }).catch((error) => {
      console.log('There was an error loading education history.')
    })
  }
  render() {
    return (
      <Page header="Education">
        {this.state.items && this.state.items.map((item) => {
          return <EducationItem key={item.id} {...item} />
        })}
      </Page>
    )
  }
}

export default Education;
