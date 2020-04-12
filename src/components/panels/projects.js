import React from 'react';

import { faHammer } from '@fortawesome/free-solid-svg-icons'

import ErrorBoundary from 'components/errorBoundary'

import Panel from './panel'
import ProjectPanelItem from './projectItem'


const ProjectsPanel = (props) => (
  <Panel className={props.bordered ? "bordered-top" : ""} header={props.header} icon={faHammer}>
    {props.projects.map((project, index) => {
      return (
        <ErrorBoundary key={index}>
          <ProjectPanelItem {...project}/>
        </ErrorBoundary>
      )
    })}
  </Panel>
)

export default ProjectsPanel;
