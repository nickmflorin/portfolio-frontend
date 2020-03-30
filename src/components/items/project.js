import React from 'react';
import PropTypes from 'prop-types';

import { Item } from './base'
import Header from './header'


class ProjectItem extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    short_description: PropTypes.string.isRequired,
  }
  render() {
    return (
      <Item maxWidth={"1200px"}>
        <Header
          title={this.props.name}
          descriptions={[this.props.short_description]}
        />
      </Item>
    )
  }
}

export default ProjectItem;
