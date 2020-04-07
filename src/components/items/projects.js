import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore'

import { getProject } from 'services'
import { getFileExtension } from 'utils'

import { FileLink } from 'components/buttons'


class Project extends React.Component {

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
      <div className='panel-content-item'>
        <h5>{this.props.name}</h5>
        <p className='description'>{this.props.showcase_description || this.props.description}</p>
        <div className='files' id='project-1'>
          {this.state.files.map((file) => {
            return <FileLink key={file.id} label={file.name} url={file.file} />
          })}
        </div>
      </div>
    )
  }
}

export default Project;
