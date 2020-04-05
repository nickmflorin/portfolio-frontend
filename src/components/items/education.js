import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import _ from 'underscore'

import { faSchool, faFire, faHammer, faCalendarAlt, faMapPin,
  faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import { getEducation } from 'services'
import { formatDateRange } from 'utils'

import { LogoLink } from 'components/buttons'
import { Logo } from 'components/image'
import IconizedText from 'components/icons'
import Tags from 'components/tags'

import Item from './base'
import Project from './projects'

import './items.sass'


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
  componentDidMount() {
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
  onImageLoadError(event){
    // TODO:  This will not handle cases where the company.url is not defined, but
    // we should have it built in none the less.
    console.log(event)
  }
  render() {
    var degree = `${this.props.degree}, ${this.props.major}`
    if(this.props.degree.charAt(this.props.degree.length - 1) === "."){
      degree = `${this.props.degree} ${this.props.major}`
    }
    return (
      <Item loading={this.state.loading}>
        <div className='header'>
          <div className='left'>
            {this.props.school.url
              ? <LogoLink src={this.props.school.logo} onError={this.onImageLoadError} href={this.props.school.url}/>
              : <Logo src={this.props.school.logo} onError={this.onImageLoadError}/>
            }
          </div>
          <div className='right'>
            <h3 className='title'>{degree}</h3>
            <h5 className='subtitle'>{this.props.school.name}</h5>
            <div className='header-items'>
              <div className='header-item'>
                <IconizedText
                  text={`${this.props.school.city}, ${this.props.school.state}`}
                  icon={faMapPin}
                />
              </div>
              <div className='header-item'>
                <IconizedText
                  text={formatDateRange(
                    this.props.start_year,
                    this.props.start_month,
                    this.props.end_year,
                    this.props.end_month
                  )}
                  icon={faCalendarAlt}
                />
              </div>
              <div className='header-item'>
                <IconizedText
                  text={`${this.props.gpa.toFixed(2)}/4.00`}
                  icon={faPaperPlane}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='body'>
          <div className='descriptions'>
            <p>{this.props.description}</p>
            {(this.props.minor && (
                <p>{this.props.minor && `Minor in ${this.props.minor}`}</p>
            ))}
            {(this.props.concentration && (
                <p>{this.props.concentration && `Concentration in ${this.props.concentration}`}</p>
            ))}
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
          {(this.state.courses.length != 0) && (
            <React.Fragment>
              <IconizedText
                text="Courses"
                icon={faSchool}
                style={{marginBottom: '12px'}}
                className={'text-tertiary large'}
              />
              <Tags items={_.pluck(this.state.courses, 'name')} />
            </React.Fragment>
          )}
        </div>
      </Item>
    )
  }
}

export default withTheme(Education);
