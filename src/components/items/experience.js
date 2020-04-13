import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore'

import { faFire, faCalendarAlt, faMapPin } from '@fortawesome/free-solid-svg-icons'

import { getExperience } from 'services'
import { formatDateRange } from 'utils'

import ErrorBoundary from 'components/errorBoundary'

import { LogoLink } from 'components/buttons'
import { HtmlDescription } from 'components/html'
import { Logo } from 'components/image'
import { IconizedText } from 'components/icons'
import { Panel, ProjectsPanel, SkillsPanel } from 'components/panels'

import PageItem from './pageItem'

import './items.sass'


class Experience extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    company: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
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
      loading: true,
    }
  }
  componentDidMount() {
    var self = this
    getExperience(this.props.id).then((response) => {
      self.setState({
        skills: response.skills,
        projects: response.projects,
      })
    }).catch((error) => {
      console.error(`There was an error loading experience ${this.props.id}.`)
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  render() {
    return (
      <PageItem id={`experience-${this.props.id}`} loading={this.state.loading}>
        <PageItem.Header>
          <div className="left">
            {this.props.company.url
              ? <LogoLink href={this.props.company.url} src={this.props.company.logo}/>
              : <Logo src={this.props.company.logo}/>
            }
          </div>
          <div className="right">
            <h1 className="thick">{this.props.title}</h1>
            <h3>{this.props.company.name}</h3>
            <div className="header-items">
              <div className="header-item">
                <IconizedText icon={faMapPin}>{`${this.props.company.city}, ${this.props.company.state}`}</IconizedText>
              </div>
              <div className="header-item">
                <IconizedText icon={faCalendarAlt}>{formatDateRange(
                  this.props.start_year,
                  this.props.start_month,
                  this.props.end_year,
                  this.props.end_month,
                  true
                )}</IconizedText>
              </div>
            </div>
          </div>
        </PageItem.Header>
        <PageItem.Body>
          <ErrorBoundary>
            <Panel>
              {(this.props.company.description) && (
                <HtmlDescription>{this.props.company.description}</HtmlDescription>
              )}
              {(this.props.description) && (
                <HtmlDescription>{this.props.description}</HtmlDescription>
              )}
            </Panel>
          </ErrorBoundary>
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
        </PageItem.Body>
      </PageItem>
    )
  }
}

export default Experience;
