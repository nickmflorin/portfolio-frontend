import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore'

import { faFire, faHammer, faCalendarAlt, faMapPin } from '@fortawesome/free-solid-svg-icons'

import { getExperience } from 'services'
import { formatDateRange, onImageLoadError } from 'utils'

import { LogoLink } from 'components/buttons'
import { HtmlDescription } from 'components/html'
import { Logo } from 'components/image'
import { IconizedHeader, IconizedText } from 'components/icons'
import Tags from 'components/tags'

import Item from './base'
import Project from './projects'
import Panel from './panel'

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
      <Item loading={this.state.loading}>
        <div className="header">
          <div className="left">
            {this.props.company.url
              ? <LogoLink href={this.props.company.url} onError={onImageLoadError} src={this.props.company.logo}/>
              : <Logo onError={onImageLoadError} src={this.props.company.logo}/>
            }
          </div>
          <div className="right">
            <h2 className="title">{this.props.title}</h2>
            <h5 className="subtitle">{this.props.company.name}</h5>
            <div className="header-items">
              <div className="header-item">
                <IconizedText icon={faMapPin}>{`${this.props.company.city}, ${this.props.company.state}`}</IconizedText>
              </div>
              <div className="header-item">
                <IconizedText icon={faCalendarAlt}>{formatDateRange(
                  this.props.start_year,
                  this.props.start_month,
                  this.props.end_year,
                  this.props.end_month
                )}</IconizedText>
              </div>
            </div>
          </div>
        </div>
        <div className="body">
          <Panel>
            {(this.props.company.description) && (
              <HtmlDescription>{this.props.company.description}</HtmlDescription>
            )}
            {(this.props.description) && (
              <HtmlDescription>{this.props.description}</HtmlDescription>
            )}
          </Panel>
          {(this.state.projects.length !== 0) && (
            <Panel header="Projects" icon={faHammer}>
              {this.state.projects.map((project, index) => {
                return <Project key={index} {...project}/>
              })}
            </Panel>
          )}
          {(this.state.skills.length !== 0) && (
            <Panel header="Skills" icon={faFire}>
              <Tags items={_.pluck(this.state.skills, 'name')} />
            </Panel>
          )}
        </div>
      </Item>
    )
  }
}

export default Experience;
