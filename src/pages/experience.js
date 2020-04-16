import React from 'react';

import { List } from 'semantic-ui-react'
import { HashLink } from 'react-router-hash-link';

import { getAllExperience } from 'services'
import { ExperienceItem } from 'components/items'
import { sortExperienceEducation } from 'utils'

import Page from './page'


class Experience extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { items: [] }
  }
  componentDidMount() {
    this.props.isLoading(true)

    var self = this
    getAllExperience().then((response) => {
      const ordered = sortExperienceEducation(response)
      self.setState({items: ordered})
    }).catch((error) => {
      console.error('There was an error loading experience history.')
    }).finally(() => {
      self.props.isLoading(false)
    })
  }
  render() {
    return (
      <Page {...this.props}>
        <Page.Content>
          <Page.Content.Left>
            <List className="accordion">
              {this.state.items.map((item) => (
                <List.Item key={item.id}>
                  <HashLink smooth to={`#experience-${item.id}`}>
                    {item.short_title || item.title}
                  </HashLink>
                </List.Item>
              ))}
            </List>
          </Page.Content.Left>
          <Page.Content.Right>
            {this.state.items.map((item) => {
              return <ExperienceItem id={item.id} key={item.id} />
            })}
          </Page.Content.Right>
        </Page.Content>
      </Page>
    )
  }
}

export default Experience;
