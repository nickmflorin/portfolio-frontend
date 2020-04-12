import React from 'react';
import _ from 'underscore'

import { faFire } from '@fortawesome/free-solid-svg-icons'

import Tags from 'components/tags'

import Panel from './panel'


const SkillsPanel = (props) => (
  <Panel className={props.bordered ? "bordered-top" : ""} header={props.header} icon={faFire}>
    <Tags items={_.pluck(props.skills, 'name')} />
  </Panel>
)

export default SkillsPanel;
