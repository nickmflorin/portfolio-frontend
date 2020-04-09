import React from 'react';

import { List } from 'semantic-ui-react'
import { HashLink } from 'react-router-hash-link';

import { getAllExperience } from 'services'
import { Page } from 'pages/page'
import { ExperienceItem } from 'components/items'
import { sortExperienceEducation } from 'utils'


class Experience extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      loading: false,
    }
  }
  componentDidMount() {
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
        <Page.Content>
          <Page.Content.Left>
            <List>
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
              return <ExperienceItem key={item.id} {...item} />
            })}
          </Page.Content.Right>
        </Page.Content>
      </Page>
    )
  }
}

export default Experience;
