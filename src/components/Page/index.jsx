import React from 'react';
import { Container } from 'react-bootstrap';

import CardComponent from '../Card';

export default function Page({ children, title }) {
  return (
    <Container fluid className="mt-5">
      <CardComponent title={title}>{children}</CardComponent>
    </Container>
  );
}
