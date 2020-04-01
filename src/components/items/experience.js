import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { faMapPin, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { formatDateRange } from 'utils'

import { getExperience } from 'services'
import { ComponentSpinner } from 'components/spinner'

import Header from './Header'
import Skills from './skills'
import Projects from './projects'
import { StyledItem, LogoContainer, Logo, DetailContainer } from './base'


class ExperienceItem extends React.Component {
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
  componentWillMount() {
    this.getExperience()
  }
  getExperience() {
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
      <StyledItem>
        <ComponentSpinner loading={this.state.loading} />
        <LogoContainer href={this.props.company.url}>
          <Logo alt="Could not Load" src={this.props.company.logo}/>
        </LogoContainer>
        <DetailContainer>
          <Header
            title={this.props.title}
            sub_title={this.props.company.name}
            descriptions={[this.props.description]}
            items={[
              {
                  id: 'location',
                  text: `${this.props.company.city}, ${this.props.company.state}`,
                  icon: faMapPin
              },
              {
                  id: 'dates',
                  text: formatDateRange(this.props.start_year, this.props.start_month, this.props.end_year, this.props.end_month),
                  icon: faCalendarAlt
              },
            ]}
          />
          {(this.state.projects.length != 0) && (
            <Projects projects={this.state.projects} />
          )}
          {(this.state.skills.length != 0) && (
            <Skills skills={this.state.skills} />
          )}
        </DetailContainer>
      </StyledItem>
    )
  }
}

export default withTheme(ExperienceItem);
