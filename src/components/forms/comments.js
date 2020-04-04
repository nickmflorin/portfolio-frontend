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

import { createComment } from 'services'
import { Item } from 'components/items';
import { CommentSuccessModal, CommentFailureModal } from 'components/modals'

import './forms.sass'


const schema = yup.object({
  name: yup.string().required().min(2, 'Too Short!'),
  email: yup.string().email(),
  comment: yup.string().required().min(5, 'Too Short!'),
  public: yup.boolean(),
});

const TextualInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors },
  bootstrapAs,
  ...props
}) => (
  <BootstrapForm.Group as={BootstrapForm.Row} style={{display: "block"}}>
    {props.label && (
      <BootstrapForm.Label>{props.label}</BootstrapForm.Label>
    )}
    <InputGroup>
      {props.prepend && (
        <InputGroup.Prepend>
          <InputGroup.Text>{props.prepend}</InputGroup.Text>
        </InputGroup.Prepend>
      )}
      <BootstrapForm.Control
        isValid={touched[field.name] && !errors[field.name]}
        isInvalid={errors[field.name]}
        as={bootstrapAs}
        {...field}
        {...props}
      />
      <BootstrapForm.Control.Feedback type="invalid">
        {touched[field.name] &&
          errors[field.name] && <div className="errors">{errors[field.name]}</div>}
      </BootstrapForm.Control.Feedback>
    </InputGroup>
    {props.help && (
      <p className='help-text'>{props.help}</p>
    )}
  </BootstrapForm.Group>
);

const CheckInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, dirty, status },
  ...props
}) => {
    return (
      <BootstrapForm.Group as={BootstrapForm.Row} style={{display: "block"}}>
        <InputGroup>
          <BootstrapForm.Check
            isValid={touched[field.name] && !errors[field.name]}
            isInvalid={errors[field.name]}
            {...field}
            {...props}
          />
          <BootstrapForm.Control.Feedback type="invalid">
            {touched[field.name] &&
              errors[field.name] && <div className="errors">{errors[field.name]}</div>}
          </BootstrapForm.Control.Feedback>
        </InputGroup>
        {props.help && (
          <p className='help-text'>{props.help}</p>
        )}
      </BootstrapForm.Group>
    );
}

export class CommentForm extends React.Component {
  static propTypes = {
    onSubmitted: PropTypes.func.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      success: false,
      failure: false,
    }
  }
  hideSuccessModal(){
    console.log('we want to hide')
    this.setState({ success: false })
  }
  hideFailureModal(){
    this.setState({ failure: false })
  }
  submitComment(values, {setSubmitting, setErrors, setStatus, resetForm}){
    this.setState({ loading: true })  // Use Formik Hook ?
    setSubmitting(true)  // Not Sure What This Triggers w Formik.

    var self = this
    createComment(values).then((response) => {
      console.log(`Comment ${response.id} Successfully Submitted`)
      self.props.onSubmitted()  // Reload the Comments to Repopulate
      resetForm()
      self.setState({ failure: false, success: true })
    }).catch((error) => {
      // TODO: Set Errors with Formik Hook?
      // TODO: Set Errors for Modal
      console.error('There was an error submitting the comment.')
      self.setState({ failure: true, success: false })
    }).finally(() => {
      self.setState({ loading: false })  // Use Formik Hook ?
      setSubmitting(false)  // Not Sure What This Triggers w Formik.
    })
  }
  render() {
      return (
        <React.Fragment>
        <CommentSuccessModal
          show={this.state.success}
          onHide={this.hideSuccessModal.bind(this)}
        />
        <CommentFailureModal
          show={this.state.failure}
          onHide={this.hideFailureModal.bind(this)}
        />
        <Item>
          <Formik
            validationSchema={schema}
            onSubmit={this.submitComment.bind(this)}
            initialValues={{
              name: '',
              email: '',
              public: false,
              comment: '',
            }}
          >
          {({ values, handleSubmit, handleChange, isSubmitting, status, errors, ...props }) => (
              <Form
                onSubmit={handleSubmit}
                loading={isSubmitting}
                success={!!status && !!status.success}
                error={!!errors.submit}
              >
                <Field
                  name="name"
                  label="Name"
                  component={TextualInput}
                  placeholder="Please provide your name."
                  type='text'
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  component={TextualInput}
                  placeholder="name@example.com"
                  prepend="@"
                  help="Only required if the submission is non-public.  Will never be displayed online."
                />
                <Field
                  component={TextualInput}
                  label="Question or Comment"
                  name="comment"
                  bootstrapAs="textarea"
                  as="textarea"
                  rows="3"
                />
                <Field
                  component={CheckInput}
                  id="public"
                  type='switch'
                  name='public'
                  label="Public"
                  help="Public questions/comments will be displayed online."
                />
                <BootstrapForm.Group as={BootstrapForm.Row}>
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
                </BootstrapForm.Group>
              </Form>
            )}
          </Formik>
        </Item>
        </React.Fragment>
      )
  }
}
