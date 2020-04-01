import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'underscore'

import { faSchool } from '@fortawesome/free-solid-svg-icons'

import { IconizedText } from 'components/icons'
import { Tags } from 'components/tags'


const StyledCourses = styled.div`
  margin-bottom: 20px;
`;


class Courses extends React.Component {
  static propTypes = {
    courses: PropTypes.array.isRequired,
  }
  render(){
    return (
      <StyledCourses>
        <IconizedText size={14} text={"Courses"} icon={faSchool} marginBottom={12}/>
        <Tags size={14} items={_.pluck(this.props.courses, 'name')} />
      </StyledCourses>
    )
  }
}

export default Courses;
