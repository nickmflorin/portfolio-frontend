import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import { faMapPin, faCalendarAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import { formatDateRange } from 'utils'
import { getEducation } from 'services'

import Item from 'components/item'

import Header from './Header'
import Skills from './skills'
import Projects from './projects'
import Courses from './courses'


const LogoContainer = styled.a`
  min-width: 80px;
  min-height: 80px;
  max-width: 80px;
  max-height: 80px;
  padding: 10px;
  display: inline-block;
`;

const Logo = styled.img`
  height: 100%;
  width: 100%;
`;

const DetailContainer = styled.div`
  padding: 12px;
  text-align: left;
  display: inline-block;

  div:last-child {
    margin-bottom: 0px !important;
  }
`;


class EducationItem extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    school: PropTypes.object.isRequired,
    degree: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    minor: PropTypes.string,
    concentration: PropTypes.string,
    gpa: PropTypes.number,
    description: PropTypes.string,
    start_year: PropTypes.number.isRequired,
    start_month: PropTypes.number.isRequired,
    end_year: PropTypes.number,
    end_month: PropTypes.number,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      skills: [],
      projects: [],
      courses: [],
      loading: true,
    }
  }
  componentWillMount() {
    this.getEducation()
  }
  getEducation() {
    var self = this
    getEducation(this.props.id).then((response) => {
      self.setState({
        skills: response.skills,
        projects: response.projects,
        courses: response.courses,
      })
    }).catch((error) => {
      console.error(`There was an error loading education ${this.props.id}.`)
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  render() {
    var degree = `${this.props.degree}, ${this.props.major}`
    if(this.props.degree.charAt(this.props.degree.length - 1) === "."){
      degree = `${this.props.degree} ${this.props.major}`
    }
    return (
      <Item loading={this.state.loading}>
        <div style={{display: 'flex'}}>
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
            {(this.state.projects.length != 0) && (
              <Projects projects={this.state.projects} />
            )}
            {(this.state.skills.length != 0) && (
              <Skills skills={this.state.skills} />
            )}
            {(this.state.courses.length != 0) && (
              <Courses courses={this.state.courses} />
            )}
          </DetailContainer>
        </div>
      </Item>
    )
  }
}

export default withTheme(EducationItem);
