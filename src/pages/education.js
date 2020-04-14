import React from 'react';
import _ from 'underscore'

import { List } from 'semantic-ui-react'
import { HashLink } from 'react-router-hash-link';

import { EducationItem } from 'components/items'
import { getAllEducation } from 'services'
import { sortExperienceEducation } from 'utils'

import Page from './page'


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
      <Page loading={this.state.loading} {...this.props}>
        <Page.Content>
          <Page.Content.Left>
            <List className="accordion">
              {this.state.items.map((item) => (
                <List.Item key={item.id}>
                  <HashLink smooth to={`#education-${item.id}`}>{item.major}</HashLink>
                </List.Item>
              ))}
            </List>
          </Page.Content.Left>
          <Page.Content.Right>
            {this.state.items.map((item) => {
              return <EducationItem id={item.id} key={item.id} />
            })}
          </Page.Content.Right>
        </Page.Content>
      </Page>
    )
  }
}

export default Education;
