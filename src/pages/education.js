import React from 'react';
import _ from 'underscore'

import { List } from 'semantic-ui-react'
import { HashLink } from 'react-router-hash-link';

import { Page, PageContent } from 'pages/page'
import { EducationItem } from 'components/items'
import { getAllEducation } from 'services'
import { sortExperienceEducation, formatDegree } from 'utils'


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
      _.each(ordered, (item) => {
        item.title = formatDegree(item.degree, item.major)
      })
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
        <PageContent>
          <PageContent.Left>
            <List>
              {this.state.items.map((item) => (
                <List.Item key={item.id}>
                  <HashLink to={`#education-${item.id}`}>{item.major}</HashLink>
                </List.Item>
              ))}
            </List>
          </PageContent.Left>
          <PageContent.Right>
            {this.state.items.map((item) => {
              return <EducationItem key={item.id} {...item} />
            })}
          </PageContent.Right>
        </PageContent>
      </Page>
    )
  }
}

export default Education;
