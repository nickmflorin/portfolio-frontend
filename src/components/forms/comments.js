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
  form: { touched, errors, status },
  bootstrapAs,
  ...props
}) => {
  return (
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
          isValid={touched[field.name] && (!errors[field.name] && !(status && status[field.name]))}
          isInvalid={touched[field.name] && (errors[field.name] || (status && status[field.name]))}
          as={bootstrapAs}
          {...field}
          {...props}
        />
        <BootstrapForm.Control.Feedback type="invalid">
          {touched[field.name] &&
            errors[field.name] && <div className="errors">{errors[field.name]}</div>}
          {status && status[field.name] &&
            <div className="errors">{status[field.name][0]}</div>}
        </BootstrapForm.Control.Feedback>
      </InputGroup>
      {props.help && (
        <p className='help-text'>{props.help}</p>
      )}
    </BootstrapForm.Group>
  )
};

const CheckInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, status },
  ...props
}) => {
    return (
      <BootstrapForm.Group as={BootstrapForm.Row} style={{display: "block"}}>
        <InputGroup>
          <BootstrapForm.Check
          isValid={touched[field.name] && (!errors[field.name] && !(status && status[field.name]))}
          isInvalid={touched[field.name] && (errors[field.name] || (status && status[field.name]))}
            {...field}
            {...props}
          />
          <BootstrapForm.Control.Feedback type="invalid">
            {touched[field.name] &&
              errors[field.name] && <div className="errors">{errors[field.name]}</div>}
            {status && status[field.name] &&
              status[field.name] && <div className="errors">{status[field.name][0]}</div>}
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
      show_success_modal: false,
      show_failure_modal: false,
      errors: []
    }
  }
  hideSuccessModal(){
    this.setState({ show_success_modal: false })
  }
  hideFailureModal(){
    this.setState({ show_failure_modal: false })
  }
  showFailureModal(errors){
    this.setState({
      show_failure_modal: true,
      errors: errors || []
    })
  }
  showSuccessModal(){
    this.setState({
      show_success_modal: true,
    })
  }
  render() {
    // TODO: Add validation for email field and public switch instead of relying
    // on API response.
    var self = this
    return (
      <React.Fragment>
        <CommentSuccessModal
          show={this.state.success}
          onHide={this.hideSuccessModal.bind(this)}
        />
        <CommentFailureModal
          show={this.state.failure}
          onHide={this.hideFailureModal.bind(this)}
          errors={this.state.errors}
        />
        <Item>
          <Formik
            validationSchema={schema}
            initialValues={{
              name: '',
              email: '',
              public: false,
              comment: '',
            }}
            onSubmit={(values, actions) => {
              self.setState({ loading: true })
              actions.setSubmitting(true)  // Not Sure What This Triggers w Formik.

              createComment(values).then((response) => {
                console.log(`Comment ${response.id} Successfully Submitted`)
                self.props.onSubmitted()  // Reload the Comments to Repopulate
                actions.resetForm()
                self.showSuccessModal()
              }).catch((error) => {
                // TODO: Maybe we want to just show these as global form errors
                // instead of using a modal.
                if (error.body) {
                  if (error.body.__all__) {
                    self.showFailureModal(error.body.__all__)
                  }
                  else {
                    actions.setStatus(error.body)
                  }
                }
                else {
                  self.showFailureModal(['Unknown error with API.'])
                }
              }).finally(() => {
                self.setState({ loading: false })  // Use Formik Hook ?
                actions.setSubmitting(false)  // Not Sure What This Triggers w Formik.
              })
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
