import React from 'react';
import {connect} from "react-redux";
import { pick, isNil } from "lodash";
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';

import Alert from 'react-bootstrap/Alert';
import BootstrapForm from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { Item } from 'components/items';

import './forms.sass'

import { publishComment } from 'actions'


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
  responseError,
  ...props
}) => {
  console.log(responseError)
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
          as={bootstrapAs}
          isInvalid={touched[field.name] && (errors[field.name] || (responseError && responseError[field.name]))}
          isValid={touched[field.name] && (!errors[field.name] && !(responseError && responseError[field.name]))}
          {...field}
          {...props}
        />
        <BootstrapForm.Control.Feedback type="invalid">
          {touched[field.name] && errors[field.name] && <div className="errors">{errors[field.name]}</div>}
          {responseError && responseError[field.name] && <div className="errors">{responseError[field.name][0]}</div>}
        </BootstrapForm.Control.Feedback>
      </InputGroup>
      {props.help && (
        <p className="help-text">{props.help}</p>
      )}
    </BootstrapForm.Group>
  )
};

const CheckInput = ({  // eslint-disable-line
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, status },
  responseError,
  ...props
}) => {
    return (
      <BootstrapForm.Group as={BootstrapForm.Row} style={{display: "block"}}>
        <InputGroup>
          <BootstrapForm.Check
          isInvalid={touched[field.name] && (errors[field.name] || (responseError && responseError[field.name]))}
          isValid={touched[field.name] && (!errors[field.name] && !(responseError && responseError[field.name]))}
            {...field}
            {...props}
          />
          <BootstrapForm.Control.Feedback type="invalid">
            {touched[field.name] && errors[field.name] && <div className="errors">{errors[field.name]}</div>}
            {responseError && responseError[field.name] && <div className="errors">{responseError[field.name][0]}</div>}
          </BootstrapForm.Control.Feedback>
        </InputGroup>
        {props.help && (
          <p className="help-text">{props.help}</p>
        )}
      </BootstrapForm.Group>
    );
}

const CommentForm = (props) => (
  <Item>
    <Formik
      initialValues={{
        name: '',
        email: '',
        public: false,
        comment: '',
      }}
      onSubmit={(values, actions) => {
        props.publishComment(values, actions.resetForm)
      }}
      validationSchema={schema}
    >
      {( formikProps ) => (
        <Form
          onSubmit={formikProps.handleSubmit}
        >
          <Field
            component={TextualInput}
            label="Name"
            name="name"
            placeholder="Please provide your name."
            type="text"
            responseError={props.comments.error}
          />
          <Field
            component={TextualInput}
            help="Only required if the submission is non-public.  Will never be displayed online."
            label="Email"
            name="email"
            placeholder="name@example.com"
            prepend="@"
            type="email"
            responseError={props.comments.error}
          />
          <Field
            as="textarea"
            bootstrapAs="textarea"
            component={TextualInput}
            label="Question or Comment"
            name="comment"
            rows="3"
            responseError={props.comments.error}
          />
          <Field
            component={CheckInput}
            help="Public questions/comments will be displayed online."
            id="public"
            label="Public"
            name="public"
            type="switch"
            responseError={props.comments.error}
          />
          {props.comments.error && !isNil(props.comments.error.__all__) && (
            <BootstrapForm.Group as={BootstrapForm.Row}>
              <Alert dismissible variant="danger">
                <Alert.Heading>{"There was an error submitting your comment."}</Alert.Heading>
                <p>{props.comments.error.__all__}</p>
              </Alert>
            </BootstrapForm.Group>
          )}
          {props.comments.success && (
            <BootstrapForm.Group as={BootstrapForm.Row}>
              <Alert dismissible variant="success">
                <Alert.Heading>{"Awesome!"}</Alert.Heading>
                <p>{"Your comment/question has successfully been submitted."}</p>
              </Alert>
            </BootstrapForm.Group>
          )}
          <BootstrapForm.Group as={BootstrapForm.Row}>
            <Button type="submit" variant="primary">
              {props.comments.publishing && (
                <Spinner
                  animation="border"
                  aria-hidden="true"
                  as="span"
                  role="status"
                  size="sm"
                />
              )}
              {"Submit"}
            </Button>
          </BootstrapForm.Group>
        </Form>
      )}
    </Formik>
  </Item>
)

const mapStateToProps = state => pick(state, ['comments'])

const mapDispatchToProps = {
  publishComment: (data, resetForm) => publishComment(data, resetForm),
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);

