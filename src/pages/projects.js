import React from 'react';
import _ from 'underscore'

import { List } from 'semantic-ui-react'
import { HashLink } from 'react-router-hash-link';

import { getProjects } from 'services'
import { Page } from 'pages/page'
import { ProjectItem } from 'components/items'


class Projects extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        projects: [],
        loading: true,
    }
  }
  componentDidMount() {
    var self = this
    getProjects().then((response) => {
      const projects = _.filter(response, (item) => item.showcase)
      self.setState({projects: projects})
    }).catch((error) => {
      console.error('There was an error loading projects.')
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  render() {
    return (
      <Page header="Projects" loading={this.state.loading}>
        <Page.Content>
          <Page.Content.Left>
            <List>
              {this.state.projects.map((item) => (
                <List.Item key={item.id}>
                  <HashLink smooth to={`#project-${item.id}`}>{item.name}</HashLink>
                </List.Item>
              ))}
            </List>
          </Page.Content.Left>
          <Page.Content.Right>
            {this.state.projects.map((project, index) => {
              return <ProjectItem key={project.id} {...project} />
            })}
          </Page.Content.Right>
        </Page.Content>
      </Page>
    )
  }
}

export default Projects;
