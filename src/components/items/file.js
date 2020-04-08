import React from 'react';


class ProjectFile extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div className="file">
        <p className="description"> {this.props.description} </p>
        <div className="image-container">
          <img alt="Cannot Load" src={this.props.file}/>
        </div>
        <p className="caption"> {this.props.caption} </p>
      </div>
    )
  }
}

export default ProjectFile;
