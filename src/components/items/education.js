import React from 'react';
import PropTypes from 'prop-types';

import { faCalendarAlt, faMapPin, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import { getEducation } from 'services'
import { formatDateRange, formatDegree } from 'utils'

import ErrorBoundary from 'components/errorBoundary'

import { LogoLink } from 'components/buttons'
import { HtmlDescription } from 'components/html'
import { Logo } from 'components/image'
import { IconizedText } from 'components/icons'

import { Panel, ProjectsPanel, SkillsPanel, CoursesPanel } from './panels'
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
        title: formatDegree(response.degree, response.major),
        minor: response.minor,
        concentration: response.concentration,
        gpa: response.gpa,
        description: response.description,
        start_year: response.start_year,
        end_year: response.end_year,
        start_month: response.start_month,
        end_month: response.end_month,
        open: false,
        dimmer: false,
      })
    }).catch((error) => {
      console.error(`There was an error loading education ${this.props.id}.`)
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  onCourseClick(id){
    console.log('Course Clicked')
    this.setState({ open: true })
  }
  onSkillClick(id){
    console.log('Skill Clicked')
    this.setState({ open: true })
  }
  close(){
    this.setState({ open: false })
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
      if (this.state.description) {
        description = description + this.state.description
      }
      if (this.state.minor) {
        description = description + `<p>Minor in ${this.state.minor}</p>`
      }
      if (this.state.concentration) {
        description = description + `<p>Concentration in ${this.state.concentration}</p>`
      }
      return (
        <PageItem id={`education-${this.props.id}`}>
          <PageItem.Header>
            <div className="left">
              {this.state.school.url
                ? <LogoLink href={this.state.school.url} src={this.state.school.logo}/>
                : <Logo src={this.state.school.logo}/>
              }
            </div>
            <div className="right">
              <h1 className="thick">{this.state.title}</h1>
              <h3>{this.state.school.name}</h3>
              <div className="header-items">
                <div className="header-item">
                  <IconizedText icon={faMapPin}>{`${this.state.school.city}, ${this.state.school.state}`}</IconizedText>
                </div>
                <div className="header-item">
                  <ErrorBoundary>
                    <IconizedText icon={faCalendarAlt}>{formatDateRange(
                      this.state.start_year,
                      this.state.start_month,
                      this.state.end_year,
                      this.state.end_month
                    )}</IconizedText>
                  </ErrorBoundary>
                </div>
                <div className="header-item">
                  <IconizedText icon={faPaperPlane}>{`${this.state.gpa.toFixed(2)}/4.00`}</IconizedText>
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
                <SkillsPanel
                  bordered
                  header={"Skills"}
                  onSkillClick={this.onSkillClick.bind(this)}
                  skills={this.state.skills}
                />
              </ErrorBoundary>
            )}
            {(this.state.courses.length !== 0) && (
              <ErrorBoundary>
                <CoursesPanel
                  bordered
                  courses={this.state.courses}
                  header={"Courses"}
                  onCourseClick={this.onCourseClick.bind(this)}
                />
              </ErrorBoundary>
            )}
          </PageItem.Body>
        </PageItem>
      )
    }
  }
}

export default Education;
