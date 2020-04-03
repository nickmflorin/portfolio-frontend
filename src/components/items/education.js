import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import _ from 'underscore'

import { faSchool, faFire, faHammer, faCalendarAlt, faMapPin,
  faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import { getEducation } from 'services'
import { formatDateRange } from 'utils'

import IconizedText from 'components/icons'
import Tags from 'components/tags'

import { Item } from './base'
import Project from './project'
import { Header, Body, Descriptions, Description, LeftContainer, RightContainer,
  HeaderItems, HeaderItem, Logo, Title, SubTitle } from './common'


class Education extends React.Component {

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
        <Header>
          <LeftContainer>
            <Logo alt="Could not Load" src={this.props.school.logo}/>
          </LeftContainer>
          <RightContainer>
            <Title>{degree}</Title>
            <SubTitle>{this.props.school.name}</SubTitle>
            <HeaderItems>
              <HeaderItem>
                <IconizedText
                  text={`${this.props.school.city}, ${this.props.school.state}`}
                  icon={faMapPin}
                />
              </HeaderItem>
              <HeaderItem>
                <IconizedText
                  text={formatDateRange(
                    this.props.start_year,
                    this.props.start_month,
                    this.props.end_year,
                    this.props.end_month
                  )}
                  icon={faCalendarAlt}
                />
              </HeaderItem>
              <HeaderItem>
                <IconizedText
                  text={`${this.props.gpa.toFixed(2)}/4.00`}
                  icon={faPaperPlane}
                />
              </HeaderItem>
            </HeaderItems>
          </RightContainer>
        </Header>
        <Body>
          <Descriptions>
            <Description>{this.props.description}</Description>
            {(this.props.minor && (
                <Description>{this.props.minor && `Minor in ${this.props.minor}`}</Description>
            ))}
            {(this.props.concentration && (
                <Description>{this.props.concentration && `Concentration in ${this.props.concentration}`}</Description>
            ))}
          </Descriptions>
          {(this.state.projects.length != 0) && (
            <React.Fragment>
              <IconizedText
                text="Projects"
                icon={faHammer}
                size='large'
                style={{marginBottom: '12px'}}
                color={this.props.theme.colors.textTertiary}
              />
              {this.state.projects.map((project, index) => {
                return <Project key={index} {...project}/>
              })}
            </React.Fragment>
          )}
          {(this.state.skills.length != 0) && (
            <React.Fragment>
              <IconizedText
                text="Skills"
                icon={faFire}
                size='large'
                style={{marginBottom: '12px'}}
                color={this.props.theme.colors.textTertiary}
              />
              <Tags items={_.pluck(this.state.skills, 'name')} />
            </React.Fragment>
          )}
          {(this.state.courses.length != 0) && (
            <React.Fragment>
              <IconizedText
                text="Courses"
                icon={faSchool}
                size='large'
                style={{marginBottom: '12px'}}
                color={this.props.theme.colors.textTertiary}
              />
              <Tags items={_.pluck(this.state.courses, 'name')} />
            </React.Fragment>
          )}
        </Body>
      </Item>
    )
  }
}

export default withTheme(Education);
