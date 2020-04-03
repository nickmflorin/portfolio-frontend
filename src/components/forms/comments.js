import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'underscore';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';

import BootstrapForm from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { Item } from 'components/items';


const ItemForm = styled(Form)`
  width: 100%;
  padding: 15px;
`;

const HelpText = styled.p`
  font-size: 10px;
  font-family: ${props => props.theme.fonts.roboto};
  font-weight: ${props => props.theme.fontweights.light};
  color: ${props => props.theme.colors.textTertiary};
  margin-left: 2px;
  margin-top: 2px;
`;

const Errors = styled.div`
  text-transform: capitalize;
`;

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email(),
  comment: yup.string().required(),
  public: yup.boolean(),
});


const NameInput = (props) => {
  return (
    <BootstrapForm.Group as={BootstrapForm.Row}>
      <BootstrapForm.Label>Name</BootstrapForm.Label>
      <InputGroup>
        <BootstrapForm.Control
          required
          type="text"
          name='name'
          placeholder="Please provide your name."
          onChange={props.handleChange}
          value={props.values.name}
          isValid={props.touched.name && !props.errors.name}
          isInvalid={props.errors.name}
        />
        <BootstrapForm.Control.Feedback type="invalid">
          <Errors>{props.errors.name}</Errors>
        </BootstrapForm.Control.Feedback>
      </InputGroup>
    </BootstrapForm.Group>
  )
}

const EmailInput = (props) => {
  return (
    <BootstrapForm.Group as={BootstrapForm.Row}>
      <BootstrapForm.Label>Email Address</BootstrapForm.Label>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
        </InputGroup.Prepend>
        <BootstrapForm.Control
          type="email"
          name='email'
          placeholder="name@example.com"
          onChange={props.handleChange}
          value={props.values.email}
          isValid={props.values.email && props.touched.email && !props.errors.email}
          isInvalid={props.errors.email || (props.touched.email && !props.values.public && !props.values.email)}
        />
        <BootstrapForm.Control.Feedback type="invalid">
          <Errors>{props.errors.email || "Must be provided if the submission is not public."}</Errors>
        </BootstrapForm.Control.Feedback>
      </InputGroup>
      <HelpText>Only required if the submission is non-public.  Will never be displayed online.</HelpText>
    </BootstrapForm.Group>
  )
}

const CommentInput = (props) => {
  return (
    <BootstrapForm.Group as={BootstrapForm.Row}>
      <BootstrapForm.Label>Question or Comment</BootstrapForm.Label>
      <BootstrapForm.Control
        required
        name="comment"
        as="textarea"
        rows="3"
        onChange={props.handleChange}
        value={props.values.comment}
        isValid={props.touched.comment && !props.errors.comment}
        isInvalid={props.errors.comment}
      />
      <BootstrapForm.Control.Feedback type="invalid">
        <Errors>{props.errors.comment}</Errors>
      </BootstrapForm.Control.Feedback>
    </BootstrapForm.Group>
  )
}

const PublicInput = (props) => {
  return (
    <BootstrapForm.Group as={BootstrapForm.Row} style={{display: "block"}}>
      <BootstrapForm.Check
        id="public"
        type='switch'
        name='public'
        label="Public"
        onChange={props.handleChange}
        isValid={props.touched.public && !props.errors.public}
      />
      <HelpText>Public questions/comments will be displayed online.</HelpText>
    </BootstrapForm.Group>
  )
}

const Submit = (props) => {
  return (
    <BootstrapForm.Group as={BootstrapForm.Row}>
      <Button variant="primary" type="submit">
        {props.loading && (
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
    </BootstrapForm.Group>
  )
}



export class LandingCommentForm extends React.Component {
  static propTypes = {
    onSubmitComment: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  }
  render() {
      var self = this
      return (
        <Item>
          <Formik
            validationSchema={schema}
            onSubmit={values => {
              self.props.onSubmitComment(values)
            }}
            initialValues={{
              name: '',
              email: '',
              public: false,
            }}
          >
          {({ handleSubmit, ...props }) => (
              <ItemForm noValidate onSubmit={handleSubmit}>
                <NameInput {...props}/>
                <EmailInput {...props}/>
                <CommentInput {...props}/>
                <PublicInput {...props}/>
                <Submit loading={this.props.loading} {...props}/>
              </ItemForm>
            )}
          </Formik>
        </Item>
      )
  }
}
