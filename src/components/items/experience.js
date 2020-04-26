import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { isNil, pick } from "lodash";

import { faCalendarAlt, faMapPin } from '@fortawesome/free-solid-svg-icons'

import { fetchExperienceIfNeeded } from 'actions'
import { formatDateRange } from 'utils'

import ErrorBoundary from 'components/errorBoundary'
import { LogoLink } from 'components/buttons'
import { HtmlDescription } from 'components/html'
import { Logo } from 'components/image'
import { IconizedText } from 'components/icons'
import { Panel, ProjectsPanel, SkillsPanel } from './panels'
import PageItem from './pageItem'

import './items.sass'


class Experience extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  componentDidMount() {
    this.props.fetchExperienceIfNeeded(this.props.id)
  }

  render() {
    const experience = this.props.experience[this.props.id]
    if (isNil(experience)) {
      return (
        <PageItem id={`experience-${this.props.id}`}>
          <PageItem.Header.Placeholder/>
          <PageItem.Body.Placeholder/>
        </PageItem>
      )
    } else if (experience.error) {
      return (
        <PageItem id={`experience-${this.props.id}`}>
          <p>There was an error.</p>
        </PageItem>
      )
    } else {
      return (
        <PageItem id={`experience-${this.props.id}`}>
          <PageItem.Header>
            <div className="left">
              {experience.company.url
                ? <LogoLink href={experience.company.url} src={experience.company.logo}/>
                : <Logo src={experience.company.logo}/>
              }
            </div>
            <div className="right">
              <h1 className="thick">{experience.title}</h1>
              <h3>{experience.company.name}</h3>
              <div className="header-items">
                <div className="header-item">
                  <IconizedText icon={faMapPin}>{`${experience.company.city}, ${experience.company.state}`}</IconizedText>
                </div>
                <div className="header-item">
                  <IconizedText icon={faCalendarAlt}>{formatDateRange(
                    experience.start_year,
                    experience.start_month,
                    experience.end_year,
                    experience.end_month,
                    true
                  )}</IconizedText>
                </div>
              </div>
            </div>
          </PageItem.Header>
          <PageItem.Body>
            <ErrorBoundary>
              <Panel>
                {(experience.company.description) && (
                  <HtmlDescription>{experience.company.description}</HtmlDescription>
                )}
                {(experience.description) && (
                  <HtmlDescription>{experience.description}</HtmlDescription>
                )}
              </Panel>
            </ErrorBoundary>
            {(experience.projects.length !== 0) && (
              <ErrorBoundary>
                <ProjectsPanel bordered header={"Projects"} projects={experience.projects} />
              </ErrorBoundary>
            )}
            {(experience.skills.length !== 0) && (
              <ErrorBoundary>
                <SkillsPanel bordered header={"Skills"} skills={experience.skills} />
              </ErrorBoundary>
            )}
          </PageItem.Body>
        </PageItem>
      )
    }
  }
}


const mapStateToProps = state => pick(state, ['experience'])

const mapDispatchToProps = {
  fetchExperienceIfNeeded: (id) => fetchExperienceIfNeeded(id),
};

export default connect(mapStateToProps, mapDispatchToProps)(Experience);


