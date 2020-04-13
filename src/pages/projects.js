import React from 'react';
import _ from 'underscore'

import { List } from 'semantic-ui-react'
import { HashLink } from 'react-router-hash-link';

import { getProjects } from 'services'
import { ProjectItem } from 'components/items'
import ErrorBoundary from 'components/errorBoundary'

import Page from './page'


class Projects extends React.Component {  // eslint-disable-line
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
      <Page header="Projects" loading={this.state.loading} {...this.props}>
        <Page.Content>
          <Page.Content.Left>
            <List className="accordion">
              {this.state.projects.map((item) => (
                <List.Item key={item.id}>
                  <HashLink smooth to={`#project-${item.id}`}>{item.name}</HashLink>
                </List.Item>
              ))}
            </List>
          </Page.Content.Left>
          <ErrorBoundary>
            <Page.Content.Right>
              {this.state.projects.map((project, index) => (
                <ErrorBoundary key={project.id}>
                  <ProjectItem {...project} />
                </ErrorBoundary>
              ))}
            </Page.Content.Right>
          </ErrorBoundary>
        </Page.Content>
      </Page>
    )
  }
}

export default Projects;
