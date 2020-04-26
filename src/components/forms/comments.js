import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { pick } from "lodash";
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
          as={bootstrapAs}
          isInvalid={touched[field.name] && (errors[field.name] || (status && status[field.name]))}
          isValid={touched[field.name] && (!errors[field.name] && !(status && status[field.name]))}
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
        <p className="help-text">{props.help}</p>
      )}
    </BootstrapForm.Group>
  )
};

const CheckInput = ({  // eslint-disable-line
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, status },
  ...props
}) => {
    return (
      <BootstrapForm.Group as={BootstrapForm.Row} style={{display: "block"}}>
        <InputGroup>
          <BootstrapForm.Check
          isInvalid={touched[field.name] && (errors[field.name] || (status && status[field.name]))}
          isValid={touched[field.name] && (!errors[field.name] && !(status && status[field.name]))}
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
          <p className="help-text">{props.help}</p>
        )}
      </BootstrapForm.Group>
    );
}

export class CommentForm extends React.Component {  // eslint-disable-line
  static propTypes = {
    onSubmitted: PropTypes.func.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      show_success: false,
      show_failure: false,
      errors: []
    }
  }
  hideSuccess(){
    this.setState({ show_success: false })
  }
  hideFailure(){
    this.setState({ show_failure: false, errors: [] })
  }
  showFailure(errors){
    this.setState({
      show_failure: true,
      errors: errors || [],
      show_success: false
    })
  }
  showSuccess(){
    this.setState({show_success: true, show_failure: false})
  }
  render() {
    var self = this
    if (this.props.comments.errors.length != 0) {
      console.log('THERE WAS AN ERROR SUBMITTING THE COMMENT')
      console.log(this.props.comments.errors)
    }
    return (
      <Item className="bordered">
        <Formik
          initialValues={{
            name: '',
            email: '',
            public: false,
            comment: '',
          }}
          onSubmit={(values, actions) => {
            self.props.publishComment(values)
            // self.setState({ loading: true })
            // actions.setSubmitting(true)  // Not Sure What This Triggers w Formik.
            //
            // createComment(values).then((response) => {
            //   console.log(`Comment ${response.id} Successfully Submitted`)
            //   self.props.onSubmitted()  // Reload the Comments to Repopulate
            //   actions.resetForm()
            //   self.showSuccess()
            // }).catch((error) => {
            //   // TODO: Maybe we want to just show these as global form errors
            //   // instead of using a modal.
            //   if (error.body) {
            //     if (error.body.__all__) {
            //       self.showFailure(error.body.__all__)
            //     }
            //     else {
            //       actions.setStatus(error.body)
            //     }
            //   }
            //   else {
            //     self.showFailure(['Unknown error with API.'])
            //   }
            // }).finally(() => {
            //   self.setState({ loading: false })  // Use Formik Hook ?
            //   actions.setSubmitting(false)  // Not Sure What This Triggers w Formik.
            // })
          }}
          validationSchema={schema}
        >
        {( props ) => (
            <Form
              onSubmit={props.handleSubmit}
            >
              <Field
                component={TextualInput}
                label="Name"
                name="name"
                placeholder="Please provide your name."
                type="text"
              />
              <Field
                component={TextualInput}
                help="Only required if the submission is non-public.  Will never be displayed online."
                label="Email"
                name="email"
                placeholder="name@example.com"
                prepend="@"
                type="email"
              />
              <Field
                as="textarea"
                bootstrapAs="textarea"
                component={TextualInput}
                label="Question or Comment"
                name="comment"
                rows="3"
              />
              <Field
                component={CheckInput}
                help="Public questions/comments will be displayed online."
                id="public"
                label="Public"
                name="public"
                type="switch"
              />
              {this.state.show_failure && (
                <BootstrapForm.Group as={BootstrapForm.Row}>
                  <Alert dismissible onClose={this.hideFailure.bind(this)} variant="danger">
                    <Alert.Heading>{"There was an error submitting your comment."}</Alert.Heading>
                    {this.state.errors.map((error, index) => {
                      return <p key={index}>{error}</p>
                    })}
                  </Alert>
                </BootstrapForm.Group>
              )}
              {this.state.show_success && (
                <BootstrapForm.Group as={BootstrapForm.Row}>
                  <Alert dismissible onClose={this.hideSuccess.bind(this)} variant="success">
                    <Alert.Heading>{"Awesome!"}</Alert.Heading>
                    <p>{"Your comment/question has successfully been submitted."}</p>
                  </Alert>
                </BootstrapForm.Group>
              )}
              <BootstrapForm.Group as={BootstrapForm.Row}>
                <Button type="submit" variant="primary">
                  {this.state.loading && (
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
  }
}

const mapStateToProps = state => pick(state, ['comments'])

const mapDispatchToProps = {
  publishComment: (data) => publishComment(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);

