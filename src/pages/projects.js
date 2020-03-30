import React from 'react';

import { getProjects } from 'services'
import { Page } from 'pages/containers'
import { ProjectItem } from 'components/items'


class Projects extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {items: []}
  }
  componentWillMount() {
    this.getProjects()
  }
  getProjects() {
    var self = this
    getProjects().then((response) => {
      self.setState({items: response})
    }).catch((error) => {
      console.log('There was an error loading projects.')
    })
  }
  render() {
    return (
      <Page header="Projects" maxWidth={"1200px"}>
        {this.state.items && this.state.items.map((item) => {
          return <ProjectItem key={item.id} {...item} />
        })}
      </Page>
    )
  }
}

export default Projects;
