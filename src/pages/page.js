import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Button, Dimmer, Image, Segment } from 'semantic-ui-react'
import { Loader } from 'semantic-ui-react'

var classNames = require('classnames');


export class Page extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClickInside = this.handleClickInside.bind(this);
    this.ref = React.createRef()
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickInside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickInside);
  }
  handleClickInside(event) {
    if (this.ref.current && this.ref.current.contains(event.target)) {
      this.props.onPageAreaClick(event)
    }
  }
  render() {
    return (
      <div
        className={this.props.className ? classNames('page', this.props.className) : 'page'}
        ref={this.ref}
      >
        <Loader active style={{position: 'fixed'}}/>
        <Dimmer.Dimmable blurring dimmed={this.props.loading}>
          <Dimmer inverted active={this.props.loading}/>
          <Container>
            {this.props.header && (
              <div className="header-container">
                <h2 className="thick">{this.props.header}</h2>
              </div>
            )}
            {this.props.children}
          </Container>
        </Dimmer.Dimmable>
      </div>
    )
  }
}

export const PageContent = (props) => ( // eslint-disable-line
  <Row>
    {props.children}
  </Row>
)

Page.Content = PageContent

PageContent.Left = (props) => ( // eslint-disable-line
  <Col lg={2} md={2} xl={2}>
    {props.children}
  </Col>
)

PageContent.Right = (props) => ( // eslint-disable-line
  <Col lg={10} md={10} sm={12} xl={10}>
    {props.children}
  </Col>
)

export default Page;
