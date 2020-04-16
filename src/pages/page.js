import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
        <Container>
          {this.props.children}
        </Container>
      </div>
    )
  }
}

Page.Content = (props) => ( // eslint-disable-line
  <Row>
    {props.children}
  </Row>
)

Page.Content.Left = (props) => ( // eslint-disable-line
  <Col lg={2} md={2} xl={2}>
    {props.children}
  </Col>
)

Page.Content.Right = (props) => ( // eslint-disable-line
  <Col className="page-items" lg={10} md={10} sm={12} xl={10}>
    {props.children}
  </Col>
)

export default Page;
