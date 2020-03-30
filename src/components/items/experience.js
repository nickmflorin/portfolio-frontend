import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { faMapPin, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { formatDateRange } from 'utils'

import Header from './Header'
import Skills from './skills'
import Projects from './projects'
import { Item, LogoContainer, Logo, DetailContainer } from './base'


class ExperienceItem extends React.Component {
  static propTypes = {
    company: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    skills: PropTypes.array,
    projects: PropTypes.array,
    start_year: PropTypes.number.isRequired,
    start_month: PropTypes.number.isRequired,
    end_year: PropTypes.number,
    end_month: PropTypes.number,
  }
  render() {
    return (
      <Item>
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
          {(this.props.projects.length != 0) && (
            <Projects projects={this.props.projects} />
          )}
          {(this.props.skills.length != 0) && (
            <Skills skills={this.props.skills} />
          )}
        </DetailContainer>
      </Item>
    )
  }
}

export default withTheme(ExperienceItem);
