import React from 'react';
import _ from 'underscore'

import { getProjects } from 'services'
import { Page } from 'pages/containers'
import { ProjectItem } from 'components/items'


class Projects extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        items: [],
        loading: true,
    }
  }
  componentWillMount() {
    this.getProjects()
  }
  getProjects() {
    var self = this
    getProjects().then((response) => {
      const projects = _.filter(response, (item) => item.display_alone)
      self.setState({
          items: projects,
          loading: false,
      })
    }).catch((error) => {
      console.error('There was an error loading projects.')
    })
  }
  render() {
    return (
      <Page header="Projects" maxWidth={"1200px"} loading={this.state.loading}>
        {this.state.items && this.state.items.map((item) => {
          return <ProjectItem key={item.id} {...item} />
        })}
      </Page>
    )
  }
}

export default Projects;
