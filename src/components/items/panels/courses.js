import React from 'react';

import { faSchool } from '@fortawesome/free-solid-svg-icons'

import Tags from './tags'
import Panel from './panel'


const CoursesPanel = (props) => (
  <Panel className={props.bordered ? "bordered-top" : ""} header={props.header} icon={faSchool}>
    <Tags items={props.courses} onTagClick={props.onCourseClick}/>
  </Panel>
)

export default CoursesPanel;
