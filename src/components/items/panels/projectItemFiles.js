import React from "react";
import { connect } from "react-redux";
import _ from "underscore";
import { pick, isNil } from "lodash";

import { fetchProjectIfNeeded } from 'actions';
import { getFileExtension } from 'utils';

import { FileLink } from 'components/buttons';
import ErrorBoundary from 'components/errorBoundary';


class ProjectPanelItemFiles extends React.Component {

  componentDidMount() {
    this.props.fetchProject(this.props.id)
  }

  render() {
    const project = this.props.projects[this.props.id]
    if (isNil(project)) {
      return (
        <div className="files"></div>
      )
    } else if (project.error) {
      return (
        <div className="files">
          <p> There was an error. </p>
        </div>
      )
    } else {
      let files = _.filter(project.files, (file) => {
        return getFileExtension(file.file) === 'pdf'
      })
      return (
        <div className="files">
          {files.map((file) => {
            return (
              <ErrorBoundary key={file.id}>
                <FileLink
                  label={file.name}
                  url={file.file}
                />
              </ErrorBoundary>
            )
          })}
        </div>
      )
    }
  }
}

const mapStateToProps = state => pick(state, ['projects'])

const mapDispatchToProps = {
  fetchProject: (id) => fetchProjectIfNeeded(id),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPanelItemFiles);
