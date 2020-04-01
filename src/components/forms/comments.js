import React from 'react';
import styled from 'styled-components';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import Item from 'components/item'


const ItemForm = styled(Form)`
  width: 100%;
  padding: 15px;
`;

const HelpText = styled.p`
  font-size: 10px;
  font-family: ${props => props.theme.fonts.roboto};
  font-weight: ${props => props.theme.fontweights.light};
  color: ${props => props.theme.colors.text_tertiary};
  margin-left: 2px;
  margin-top: 2px;
`;


export class LandingCommentForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      name: "",
      email: "",
      comment: "",
      public: true,
      loading: false,
    }
  }
  handleInputChange(event){
    const target = event.target;
    const value = target.id === 'public' ? target.checked : target.value;
    const name = target.id === 'public' ? target.id : target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event){
    event.preventDefault();
    this.setState({ loading: true })
    console.log(this.state)
  }
  render() {
      return (
        <Item>
          <ItemForm onSubmit={this.handleSubmit}>
            <Form.Group as={Form.Row} controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="input"
                name='name'
                onChange={this.handleInputChange}
                value={this.state.name}
                placeholder="Please provide your name."
              />
              <HelpText>Required</HelpText>
            </Form.Group>
            <Form.Group as={Form.Row} controlId="exampleForm.ControlInput1">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name='email'
                onChange={this.handleInputChange}
                value={this.state.email}
                placeholder="name@example.com"
              />
              <HelpText>Required if the question/comment is non-public.  Will never be displayed online.</HelpText>
            </Form.Group>
            <Form.Group as={Form.Row} controlId="exampleForm.ControlTextarea1">
              <Form.Label>Question or Comment</Form.Label>
              <Form.Control
                name="comment"
                value={this.state.comment}
                onChange={this.handleInputChange}
                as="textarea"
                rows="3"
              />
            </Form.Group>
            <Form.Group as={Form.Row} style={{display: "block"}}>
              <Form.Check
                type='switch'
                id='public'
                label="Public"
                onChange={this.handleInputChange}
                checked={this.state.public}
              />
              <HelpText>Public questions/comments will be displayed online.</HelpText>
            </Form.Group>
            <Form.Group as={Form.Row}>
              <Button variant="primary" type="submit">
                {this.state.loading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                Submit
              </Button>
            </Form.Group>
          </ItemForm>
        </Item>
      )
  }
}
