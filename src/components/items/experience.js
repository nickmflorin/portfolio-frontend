import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import _ from 'underscore'

import { faFire, faHammer, faCalendarAlt, faMapPin } from '@fortawesome/free-solid-svg-icons'

import { getExperience } from 'services'
import { formatDateRange } from 'utils'

import IconizedText from 'components/icons'
import Tags from 'components/tags'

import Item from './base'
import Project from './projects'

import './items.sass'


class Experience extends React.Component {

  static propTypes = {
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
        <div className='header'>
          <div className='left'>
            <img className='logo' alt="Could not Load" src={this.props.company.logo}/>
          </div>
          <div className='right'>
            <h3 className='title'>{this.props.title}</h3>
            <h5 className='subtitle'>{this.props.company.name}</h5>
            <div className='header-items'>
              <div className='header-item'>
                <IconizedText
                  text={`${this.props.company.city}, ${this.props.company.state}`}
                  icon={faMapPin}
                />
              </div>
              <div className='header-item'>
                <IconizedText
                  text={formatDateRange(this.props.start_year, this.props.start_month, this.props.end_year, this.props.end_month)}
                  icon={faCalendarAlt}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='body'>
          <div className='descriptions'>
            <p>{this.props.description}</p>
          </div>
          {(this.state.projects.length != 0) && (
            <React.Fragment>
              <IconizedText
                text="Projects"
                icon={faHammer}
                style={{marginBottom: '12px'}}
                className={'text-tertiary large'}
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
                style={{marginBottom: '12px'}}
                className={'text-tertiary large'}
              />
              <Tags items={_.pluck(this.state.skills, 'name')} />
            </React.Fragment>
          )}
        </div>
      </Item>
    )
  }
}

export default withTheme(Experience);
