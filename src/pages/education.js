import React from 'react';

import { Page } from 'pages/containers'
import { EducationItem } from 'components/items'
import { getAllEducation } from 'services'
import { sortExperienceEducation, formatDateRange } from 'utils'


class Education extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      loading: false,
    }
  }
  componentDidMount() {
    var self = this
    getAllEducation().then((response) => {
      const ordered = sortExperienceEducation(response)
      self.setState({items: ordered})
    }).catch((error) => {
      console.error('There was an error loading education history.')
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  render() {
    return (
      <Page header="Education" loading={this.state.loading}>
        <div>
          {this.state.items.map((item) => {
            return <EducationItem key={item.id} {...item} />
          })}
        </div>
      </Page>
    )
  }
}

export default Education;
