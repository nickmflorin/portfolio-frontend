import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'underscore'

import { faFire } from '@fortawesome/free-solid-svg-icons'

import { getProject } from 'services'
import { isImageFile } from 'utils'

import IconizedText from 'components/icons'
import Tags from 'components/tags'
import Item from './base'

import './items.sass'


class ProjectFile extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div className='file'>
        <p className='description'> {this.props.description} </p>
        <div className='image-container'>
          <img src={this.props.file}/>
        </div>
        <p className='caption'> {this.props.caption} </p>
      </div>
    )
  }
}


class Project extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
        loading: true,
        showcase_description: null,
        skills: [],
        files: [],
    }
  }
  componentDidMount() {
    var self = this
    getProject(this.props.id).then((response) => {
      const files = _.filter(response.files, (file) => {
        return isImageFile(file.file)
      })
      self.setState({
          showcase_description: response.showcase_description,
          files: files,
          skills: response.skills,
      })
    }).catch((error) => {
      console.error(`There was an error loading project ${this.props.id}.`)
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  render() {
    return (
        <Item
          id={`project-${this.props.id}`}
          loading={this.state.loading}
          className='project'
        >
          <div className='header'>
            <h3 className='title'>{this.props.name}</h3>
          </div>
          <div className='body project'>
            <div className='panel descriptions'>
              <p>{this.state.showcase_description}</p>
            </div>
            {(this.state.skills.length != 0) && (
              <div className='panel'>
                <div className='panel-content'>
                  <Tags items={_.pluck(this.state.skills, 'name')} />
                </div>
              </div>
            )}
            <div className='files-container'>
              {this.state.files.map((file) => {
                return (
                  <ProjectFile
                    id={file.id}
                    key={file.id}
                    file={file.file}
                    caption={file.caption}
                    description={file.description}
                  />
                )
              })}
            </div>
          </div>
        </Item>
    )
  }
}

export default Project;
