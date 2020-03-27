import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import Item from './item'
import { faMapPin, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { formatDateRange } from 'utils'


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
      <Item
        title={this.props.title}
        sub_title={this.props.company.name}
        logo={this.props.company.logo}
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
        descriptions={[this.props.description]}
        {...this.props}
      >
      </Item>
    )
  }
}

export default withTheme(ExperienceItem);
