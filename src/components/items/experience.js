import React from 'react';
import PropTypes from 'prop-types';

import { faCalendarAlt, faMapPin } from '@fortawesome/free-solid-svg-icons'

import { getExperience } from 'services'
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

  constructor(props, context) {
    super(props, context);
    this.state = {
      skills: [],
      projects: [],
      start_year: null,
      end_year: null,
      start_month: null,
      end_month: null,
      company: null,
      title: null,
      description: null,
      loading: true,
    }
  }
  componentDidMount() {
    var self = this
    getExperience(this.props.id).then((response) => {
      self.setState({
        skills: response.skills,
        projects: response.projects,
        company: response.company,
        start_year: response.start_year,
        end_year: response.end_year,
        start_month: response.start_month,
        end_month: response.end_month,
        title: response.title,
        description: response.description,
      })
    }).catch((error) => {
      console.error(`There was an error loading experience ${this.props.id}.`)
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  render() {
    if (this.state.loading) {
      return (
        <PageItem id={`experience-${this.props.id}`} loading>
            <PageItem.Header.Placeholder/>
            <PageItem.Body.Placeholder/>
        </PageItem>
      )
    }
    else {
      return (
        <PageItem id={`experience-${this.props.id}`}>
          <PageItem.Header>
            <div className="left">
              {this.state.company.url
                ? <LogoLink href={this.state.company.url} src={this.state.company.logo}/>
                : <Logo src={this.state.company.logo}/>
              }
            </div>
            <div className="right">
              <h1 className="thick">{this.state.title}</h1>
              <h3>{this.state.company.name}</h3>
              <div className="header-items">
                <div className="header-item">
                  <IconizedText icon={faMapPin}>{`${this.state.company.city}, ${this.state.company.state}`}</IconizedText>
                </div>
                <div className="header-item">
                  <IconizedText icon={faCalendarAlt}>{formatDateRange(
                    this.state.start_year,
                    this.state.start_month,
                    this.state.end_year,
                    this.state.end_month,
                    true
                  )}</IconizedText>
                </div>
              </div>
            </div>
          </PageItem.Header>
          <PageItem.Body>
            <ErrorBoundary>
              <Panel>
                {(this.state.company.description) && (
                  <HtmlDescription>{this.state.company.description}</HtmlDescription>
                )}
                {(this.state.description) && (
                  <HtmlDescription>{this.state.description}</HtmlDescription>
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
}

export default Experience;
