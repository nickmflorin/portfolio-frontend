import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore'

import { faSchool, faFire, faHammer, faCalendarAlt, faMapPin,
  faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import { getEducation } from 'services'
import { formatDateRange } from 'utils'

import ErrorBoundary from 'components/errorBoundary'

import { LogoLink } from 'components/buttons'
import { HtmlDescription } from 'components/html'
import { Logo } from 'components/image'
import { IconizedText } from 'components/icons'
import { Panel, ProjectsPanel, SkillsPanel, CoursesPanel } from 'components/panels'

import PageItem from './pageItem'

import './items.sass'


class Education extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      skills: [],
      projects: [],
      courses: [],
      school: null,
      title: null,
      minor: null,
      concentration: null,
      gpa: null,
      description: null,
      start_year: null,
      end_year: null,
      start_month: null,
      end_month: null,
      loading: true,
    }
  }
  componentDidMount() {
    var self = this
    getEducation(this.props.id).then((response) => {
      self.setState({
        skills: response.skills,
        projects: response.projects,
        courses: response.courses,
        school: response.school,
        title: response.title,
        minor: response.minor,
        concentration: response.concentration,
        gpa: response.gpa,
        description: response.description,
        start_year: response.start_year,
        end_year: response.end_year,
        start_month: response.start_month,
        end_month: response.end_month,
      })
    }).catch((error) => {
      console.error(`There was an error loading education ${this.props.id}.`)
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  render() {
    if (this.state.loading) {
      return (
        <PageItem id={`education-${this.props.id}`} loading>
            <PageItem.Header.Placeholder/>
            <PageItem.Body.Placeholder/>
        </PageItem>
      )
    }
    else {
      var description = ""
      if (this.props.description) {
        description = description + this.props.description
      }
      if (this.props.minor) {
        description = description + `<p>Minor in ${this.props.minor}</p>`
      }
      if (this.props.concentration) {
        description = description + `<p>Concentration in ${this.props.concentration}</p>`
      }
      return (
        <PageItem id={`education-${this.props.id}`}>
          <PageItem.Header>
            <div className="left">
              {this.props.school.url
                ? <LogoLink href={this.props.school.url} src={this.props.school.logo}/>
                : <Logo src={this.props.school.logo}/>
              }
            </div>
            <div className="right">
              <h1 className="thick">{this.props.title}</h1>
              <h3>{this.props.school.name}</h3>
              <div className="header-items">
                <div className="header-item">
                  <IconizedText icon={faMapPin}>{`${this.props.school.city}, ${this.props.school.state}`}</IconizedText>
                </div>
                <div className="header-item">
                  <ErrorBoundary>
                    <IconizedText icon={faCalendarAlt}>{formatDateRange(
                      this.props.start_year,
                      this.props.start_month,
                      this.props.end_year,
                      this.props.end_month
                    )}</IconizedText>
                  </ErrorBoundary>
                </div>
                <div className="header-item">
                  <IconizedText icon={faPaperPlane}>{`${this.props.gpa.toFixed(2)}/4.00`}</IconizedText>
                </div>
              </div>
            </div>
          </PageItem.Header>
          <PageItem.Body>
            {description !== "" && (
              <Panel>
                <HtmlDescription>{description}</HtmlDescription>
              </Panel>
            )}
            {(this.state.projects.length !== 0) && (
              <ErrorBoundary>
                <ProjectsPanel bordered header={"Projects"} projects={this.state.projects} />
              </ErrorBoundary>
            )}
            {(this.state.skills.length !== 0) && (
              <ErrorBoundary>
                <SkillsPanel bordered header={"Skills"} skills={this.state.skills} />
              </ErrorBoundary>
            )}
            {(this.state.courses.length !== 0) && (
              <ErrorBoundary>
                <CoursesPanel bordered courses={this.state.courses} header={"Courses"}/>
              </ErrorBoundary>
            )}
          </PageItem.Body>
        </PageItem>
      )
    }
  }
}

export default Education;
