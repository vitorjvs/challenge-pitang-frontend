import React from 'react';
import { Card } from 'react-bootstrap';

export default function CardComponent({ title, children }) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <center>{title}</center>
        </Card.Title>
      </Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
}
