import React from 'react';
import _ from 'underscore'

import { List } from 'semantic-ui-react'
import ReactDOM from "react-dom";
import { withRouter} from 'react-router-dom'

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
  scrollToProject(element, behavior, timeout){
      setTimeout(() => {
        element.scrollIntoView({behavior: behavior});
      }, timeout);
  }
  render() {
    return (
      <Page loading={this.state.loading} {...this.props}>
        <Page.Content>
          <Page.Content.Left>
            <List className="accordion">
              {this.state.projects.map((item) => (
                <List.Item key={item.id}>
                  <a className={"accordion-link"} onClick={() => {
                    const element = document.getElementById(`project-${item.id}`)
                    if (element) {
                        this.scrollToProject(element, 'smooth', 0)
                    }
                  }}
                  >{item.name}</a>
                </List.Item>
              ))}
            </List>
          </Page.Content.Left>
          <ErrorBoundary>
            <Page.Content.Right>
              {this.state.projects.map((project, index) => (
                <ErrorBoundary key={project.id}>
                  <ProjectItem
                    ref={(el) => {
                      // We only want this scroll to get triggered when the page
                      // is loading for the first time, not if a hash link from the
                      // accordion is clicked.
                      if (el != null && `#project-${project.id}` === this.props.location.hash){
                        const element = ReactDOM.findDOMNode(el)
                        if (element) {
                            this.scrollToProject(element, 'auto', 500)
                        }
                      }
                    }}
                    {...project}
                  />
                </ErrorBoundary>
              ))}
            </Page.Content.Right>
          </ErrorBoundary>
        </Page.Content>
      </Page>
    )
  }
}

export default withRouter(Projects);
