import React from 'react';
import _ from 'underscore'

import { getProjects } from 'services'
import { Page } from 'pages/page'
import { ProjectItem } from 'components/items'

import "./pages.sass"


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
        {this.state.projects.map((project, index) => {
          return <ProjectItem key={project.id} {...project} />
        })}
      </Page>
    )
  }
}

export default Projects;
