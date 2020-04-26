import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { pick, isNil }  from "lodash";

import { faCalendarAlt, faMapPin, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import { fetchEducationIfNeeded } from 'actions'
import { formatDateRange, formatDegree, formatGpa, formatEducationDescription } from 'utils'

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

  componentDidMount() {
    this.props.fetchEducationIfNeeded(this.props.id)
  }

  onCourseClick(id){
    this.setState({ open: true })
  }

  onSkillClick(id){
    this.setState({ open: true })
  }

  close(){
    this.setState({ open: false })
  }

  render() {
    const education = this.props.education[this.props.id]
    if (isNil(education)) {
      return (
        <PageItem id={`education-${this.props.id}`}>
          <PageItem.Header.Placeholder/>
          <PageItem.Body.Placeholder/>
        </PageItem>
      )
    } else if (education.error) {
      return (
        <PageItem id={`education-${this.props.id}`}>
          <p>There was an error.</p>
        </PageItem>
      )
    } else {
      return (
        <PageItem id={`education-${this.props.id}`}>
          <PageItem.Header>
            <div className="left">
              {education.school.url
                ? <LogoLink href={education.school.url} src={education.school.logo}/>
                : <Logo src={education.school.logo}/>
              }
            </div>
            <div className="right">
              <h1 className="thick">{formatDegree(education.degree, education.major)}</h1>
              <h3>{education.school.name}</h3>
              <div className="header-items">
                <div className="header-item">
                  <IconizedText icon={faMapPin}>{`${education.school.city}, ${education.school.state}`}</IconizedText>
                </div>
                <div className="header-item">
                  <ErrorBoundary>
                    <IconizedText icon={faCalendarAlt}>{formatDateRange(
                      education.start_year,
                      education.start_month,
                      education.end_year,
                      education.end_month
                    )}</IconizedText>
                  </ErrorBoundary>
                </div>
                <div className="header-item">
                  <IconizedText icon={faPaperPlane}>{formatGpa(education.gpa)}</IconizedText>
                </div>
              </div>
            </div>
          </PageItem.Header>
          <PageItem.Body>
            <Panel>
              {education.school.description && (
                <HtmlDescription>
                  {education.school.description}
                </HtmlDescription>
              )}
              {formatEducationDescription(
                  education.description, education.minor, education.concentration) && (
                <HtmlDescription>
                  {formatEducationDescription(
                    education.description, education.minor, education.concentration)}
                </HtmlDescription>
              )}
            </Panel>
            {(education.projects.length !== 0) && (
              <ErrorBoundary>
                <ProjectsPanel bordered header={"Projects"} projects={education.projects} />
              </ErrorBoundary>
            )}
            {(education.skills.length !== 0) && (
              <ErrorBoundary>
                <SkillsPanel
                  bordered
                  header={"Skills"}
                  onSkillClick={this.onSkillClick.bind(this)}
                  skills={education.skills}
                />
              </ErrorBoundary>
            )}
            {(education.courses.length !== 0) && (
              <ErrorBoundary>
                <CoursesPanel
                  bordered
                  courses={education.courses}
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

const mapStateToProps = state => pick(state, ['education'])

const mapDispatchToProps = {
  fetchEducationIfNeeded: (id) => fetchEducationIfNeeded(id),
};

export default connect(mapStateToProps, mapDispatchToProps)(Education);

