/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useField } from 'formik';
import { Col, Row, Container } from 'react-bootstrap';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { name } = props;
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={3}>
          <label htmlFor={name}>
            <b>{label}</b>
          </label>
        </Col>
        <Col>
          <input className="text-input" {...field} {...props} />
          {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default TextInput;
