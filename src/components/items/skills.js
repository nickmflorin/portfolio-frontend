import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'underscore'

import { faFire } from '@fortawesome/free-solid-svg-icons'

import { IconizedText } from 'components/icons'
import { Tags } from 'components/tags'


const StyledSkills = styled.div`
  margin-bottom: 20px;
`;


class Skills extends React.Component {
  static propTypes = {
    skills: PropTypes.array.isRequired,
  }
  render(){
    return (
      <StyledSkills>
        <IconizedText size={14} text={"Skills"} icon={faFire} marginBottom={12}/>
        <Tags size={14} items={_.pluck(this.props.skills, 'name')} />
      </StyledSkills>
    )
  }
}

export default Skills;
