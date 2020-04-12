import React from 'react';
import _ from 'underscore'

import { faFire } from '@fortawesome/free-solid-svg-icons'

import Tags from 'components/tags'

import Panel from './panel'


const SkillsPanel = (props) => (
  <Panel className="bordered-top" header="Skills" icon={faFire}>
    <Tags items={_.pluck(props.skills, 'name')} />
  </Panel>
)

export default SkillsPanel;
