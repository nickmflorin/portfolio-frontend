import React from "react";
import PropTypes from "prop-types";

import { HtmlDescription } from 'components/html';
import { ProjectHeader } from 'components/items/headers'
import ProjectPanelItemFiles from './projectItemFiles'


class ProjectPanelItem extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    showcase_description: PropTypes.string,
    showcase: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <div>
        <ProjectHeader
          id={this.props.id}
          name={this.props.name}
          showcase={this.props.showcase}
        />
        <HtmlDescription>{this.props.description}</HtmlDescription>
        <ProjectPanelItemFiles id={this.props.id}/>
      </div>
    )
  }
}

export default ProjectPanelItem;
