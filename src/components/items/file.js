import React from 'react';
import PropTypes from 'prop-types';

import { HtmlDescription, HtmlCaption } from 'components/html'


class ProjectFile extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string,
    file: PropTypes.string.isRequired,
    caption: PropTypes.string,
  }
  render() {
    return (
      <div className="file">
        {this.props.description && (
          <HtmlDescription>{this.props.description}</HtmlDescription>
        )}
        <div className="image-container">
          <img alt="Cannot Load" src={this.props.file}/>
        </div>
        {this.props.caption && (
          <HtmlCaption>{this.props.caption}</HtmlCaption>
        )}
      </div>
    )
  }
}

export default ProjectFile;
