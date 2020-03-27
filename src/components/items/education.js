import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import _ from 'underscore'

import { faMapPin, faCalendarAlt, faPaperPlane, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import { formatDateRange } from 'utils'

import { IconizedText } from 'components/icons'
import { Tags } from 'components/tags'

import Item from './item'


class EducationItem extends React.Component {
  static propTypes = {
    school: PropTypes.object.isRequired,
    degree: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    minor: PropTypes.string,
    concentration: PropTypes.string,
    gpa: PropTypes.number,
    description: PropTypes.string,
    skills: PropTypes.array,
    projects: PropTypes.array,
    start_year: PropTypes.number.isRequired,
    start_month: PropTypes.number.isRequired,
    end_year: PropTypes.number,
    end_month: PropTypes.number,
  }

  render() {
    var degree = `${this.props.degree}, ${this.props.major}`
    if(this.props.degree.charAt(this.props.degree.length - 1) === "."){
      degree = `${this.props.degree} ${this.props.major}`
    }
    return (
      <Item
        title={degree}
        sub_title={this.props.school.name}
        logo={this.props.school.logo}
        items={[
          {
              id: 'location',
              text: `${this.props.school.city}, ${this.props.school.state}`,
              icon: faMapPin
          },
          {
              id: 'dates',
              text: formatDateRange(this.props.start_year, this.props.start_month, this.props.end_year, this.props.end_month),
              icon: faCalendarAlt
          },
          {
              id: 'gpa',
              text: `${this.props.gpa.toFixed(2)}/4.00`,
              icon:faPaperPlane
          }
        ]}
        descriptions={[
          this.props.description,
          (this.props.minor && `Minor in ${this.props.minor}`),
          (this.props.concentration && `Concentration in ${this.props.concentration}`)
        ]}
        {...this.props}
      >
      {(this.props.courses.length != 0) && (
        <div style={{marginBottom: 12}}>
          <IconizedText size={14} text={"Courses"} icon={faChalkboardTeacher} marginBottom={12}/>
          <Tags size={14} items={_.pluck(this.props.courses, 'name')} />
        </div>
      )}
      </Item>
    )
  }
}

export default withTheme(EducationItem);
