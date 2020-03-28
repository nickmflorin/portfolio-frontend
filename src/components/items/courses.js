import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'underscore'

import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'

import { IconizedText } from 'components/icons'
import { Tags } from 'components/tags'


const StyledCourses = styled.div`
  margin-bottom: 22px;
`;


class ItemCourses extends React.Component {
  static propTypes = {
    courses: PropTypes.array.isRequired,
  }
  render(){
    return (
      <StyledCourses>
        <IconizedText size={14} text={"Courses"} icon={faChalkboardTeacher} marginBottom={12}/>
        <Tags size={14} items={_.pluck(this.props.courses, 'name')} />
      </StyledCourses>
    )
  }
}

export default ItemCourses;
