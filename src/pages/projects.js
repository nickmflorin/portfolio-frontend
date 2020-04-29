import React from 'react';
import { connect } from "react-redux";
import { pick } from "lodash";
import { List } from 'semantic-ui-react'
import ReactDOM from "react-dom";
import { withRouter} from 'react-router-dom'

import { fetchProjects } from 'actions';

import { ProjectItem } from 'components/items'
import ErrorBoundary from 'components/errorBoundary'

import Page from './page'

class Projects extends React.Component {  // eslint-disable-line

  componentDidMount() {
    this.props.fetchProjects()
  }

  scrollToProject(element, behavior, timeout){
      setTimeout(() => {
        element.scrollIntoView({behavior: behavior});
      }, timeout);
  }

  render() {
    return (
      <Page {...this.props}>
        <Page.Content>
          <Page.Content.Left>
            <List className="accordion">
              {this.props.projects.all.map((item) => (
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
              {this.props.projects.all.map((project, index) => (
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

const mapStateToProps = state => pick(state, ['projects'])

const mapDispatchToProps = {
  fetchProjects: () => fetchProjects(),
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Projects));

