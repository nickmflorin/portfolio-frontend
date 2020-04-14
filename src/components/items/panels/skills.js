import React from 'react';

import { faFire } from '@fortawesome/free-solid-svg-icons'

import Tags from './tags'
import Panel from './panel'


const SkillsPanel = (props) => (
  <Panel className={props.bordered ? "bordered-top" : ""} header={props.header} icon={faFire}>
    <Tags items={props.skills} onTagClick={props.onSkillClick}/>
  </Panel>
)

export default SkillsPanel;
