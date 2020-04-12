import React from 'react';
import _ from 'underscore'

import { faSchool } from '@fortawesome/free-solid-svg-icons'

import Tags from 'components/tags'

import Panel from './panel'


const CoursesPanel = (props) => (
  <Panel className={props.bordered ? "bordered-top" : ""} header={props.header} icon={faSchool}>
    <Tags items={_.pluck(props.courses, 'name')} />
  </Panel>
)

export default CoursesPanel;
