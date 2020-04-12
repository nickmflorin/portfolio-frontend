import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

import { getProject } from 'services';
import { getFileExtension } from 'utils';

import { HtmlDescription } from 'components/html';
import { FileLink } from 'components/buttons';
import ErrorBoundary from 'components/errorBoundary'


class ProjectPanelItem extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    showcase_description: PropTypes.string,
    showcase: PropTypes.bool.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
        files: [],
        loading: true,
    }
  }
  componentDidMount() {
    /**
    * TODO: We only need this API call to get the PDF files associated with
      the project.  Ideally, we want the projects attached with a given education
      or experience to maybe only return the id and name.
    */
    var self = this
    getProject(this.props.id).then((response) => {
      var files = _.filter(response.files, (file) => {
        var extension = getFileExtension(file.file)
        return extension === 'pdf'
      })
      self.setState({files: files})
    }).catch((error) => {
      console.error(`There was an error retrieving project ${this.props.id}.`)
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  render() {
    // TODO: Include link icon next to text for project name if it has an associated
    // project showcased on the projects page.
    return (
      <React.Fragment>
        <h6>{this.props.name}</h6>
        <HtmlDescription>{this.props.description}</HtmlDescription>
        {this.state.files.length !== 0 && (
          <div className="files">
            {this.state.files.map((file) => {
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
        )}
      </React.Fragment>
    )
  }
}

export default ProjectPanelItem;