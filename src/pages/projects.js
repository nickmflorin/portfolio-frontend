import React from 'react';
import _ from 'underscore'

import { getProjects } from 'services'
import { Page } from 'pages/page'
import { ProjectItem } from 'components/items'

import "./pages.sass"


class Projects extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.references = []
    this.state = {
        items: [],
        loading: true,
    }
  }
  componentDidMount() {
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
      <Page header="Projects" loading={this.state.loading} style={{maxWidth: 1200}}>
        <div>
          {this.state.items && this.state.items.map((item, index) => {
            return <ProjectItem key={item.id} {...item} />
          })}
        </div>
      </Page>
    )
  }
}

export default Projects;
