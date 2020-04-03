import React from 'react';
import _ from 'underscore'

import { getProjects } from 'services'
import { Page } from 'pages/containers'
import { ProjectItem, ItemsContainer } from 'components/items'


class Projects extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.references = []
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
      const projects = _.filter(response, (item) => item.showcase)
      self.setState({items: projects})
    }).catch((error) => {
      console.error('There was an error loading projects.')
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  render() {
    return (
      <Page header="Projects" maxWidth={"1200px"} loading={this.state.loading}>
        <ItemsContainer>
          {this.state.items && this.state.items.map((item, index) => {
            return <ProjectItem key={item.id} {...item} />
          })}
        </ItemsContainer>
      </Page>
    )
  }
}

export default Projects;
