import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { faMapPin, faCalendarAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { formatDateRange } from 'utils'

import Header from './Header'
import Skills from './skills'
import Projects from './projects'
import Courses from './courses'
import { Item, LogoContainer, Logo, DetailContainer } from './base'


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
    courses: PropTypes.array,
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
      <Item>
        <LogoContainer>
          <Logo alt="Could not Load" src={this.props.school.logo}/>
        </LogoContainer>
        <DetailContainer>
          <Header
            title={degree}
            sub_title={this.props.school.name}
            descriptions={[
              this.props.description,
              (this.props.minor && `Minor in ${this.props.minor}`),
              (this.props.concentration && `Concentration in ${this.props.concentration}`)
            ]}
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
          />
          {(this.props.projects.length != 0) && (
            <Projects projects={this.props.projects} />
          )}
          {(this.props.skills.length != 0) && (
            <Skills skills={this.props.skills} />
          )}
          {(this.props.courses.length != 0) && (
            <Courses courses={this.props.courses} />
          )}
        </DetailContainer>
      </Item>
    )
  }
}

export default withTheme(EducationItem);
