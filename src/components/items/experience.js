import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import _ from 'underscore'

import { faFire, faHammer, faCalendarAlt, faMapPin } from '@fortawesome/free-solid-svg-icons'

import { getExperience } from 'services'
import { formatDateRange } from 'utils'

import IconizedText from 'components/icons'
import Tags from 'components/tags'

import { Item } from './base'
import Project from './project'
import { Header, Body, Descriptions, Description, LeftContainer, RightContainer,
  HeaderItems, HeaderItem, Logo, Title, SubTitle } from './common'


class Experience extends React.Component {
  static propTypes = {
    company: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    start_year: PropTypes.number.isRequired,
    start_month: PropTypes.number.isRequired,
    end_year: PropTypes.number,
    end_month: PropTypes.number,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      skills: [],
      projects: [],
      loading: true,
    }
  }
  componentWillMount() {
    this.getExperience()
  }
  getExperience() {
    var self = this
    getExperience(this.props.id).then((response) => {
      self.setState({
        skills: response.skills,
        projects: response.projects,
      })
    }).catch((error) => {
      console.error(`There was an error loading experience ${this.props.id}.`)
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  render() {
    return (
      <Item loading={this.state.loading}>
        <Header>
          <LeftContainer>
            <Logo alt="Could not Load" src={this.props.company.logo}/>
          </LeftContainer>
          <RightContainer>
            <Title>{this.props.title}</Title>
            <SubTitle>{this.props.company.name}</SubTitle>
            <HeaderItems>
              <HeaderItem>
                <IconizedText
                  text={`${this.props.company.city}, ${this.props.company.state}`}
                  icon={faMapPin}
                />
              </HeaderItem>
              <HeaderItem>
                <IconizedText
                  text={formatDateRange(this.props.start_year, this.props.start_month, this.props.end_year, this.props.end_month)}
                  icon={faCalendarAlt}
                />
              </HeaderItem>
            </HeaderItems>
          </RightContainer>
        </Header>
        <Body>
          <Descriptions>
            <Description>{this.props.description}</Description>
          </Descriptions>
          {(this.state.projects.length != 0) && (
            <React.Fragment>
              <IconizedText
                text="Projects"
                icon={faHammer}
                size='large'
                style={{marginBottom: '12px'}}
                color={this.props.theme.colors.textTertiary}
              />
              {this.state.projects.map((project, index) => {
                return <Project key={index} {...project}/>
              })}
            </React.Fragment>
          )}
          {(this.state.skills.length != 0) && (
            <React.Fragment>
              <IconizedText
                text="Skills"
                icon={faFire}
                size='large'
                style={{marginBottom: '12px'}}
                color={this.props.theme.colors.textTertiary}
              />
              <Tags items={_.pluck(this.state.skills, 'name')} />
            </React.Fragment>
          )}
        </Body>
      </Item>
    )
  }
}

export default withTheme(Experience);
