import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import DropdownFilter from './DropdownFilter';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

export default function MainSearchPage() {
  return (
    <Container className="m-4">
      <Row>
        <DropdownFilter />
      </Row>
      <Row>
        <SearchInput />
      </Row>
      <Row>
        <SearchResults />
      </Row>
    </Container>
  );
}
