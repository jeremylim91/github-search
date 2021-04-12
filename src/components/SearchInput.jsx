import React from 'react';
import {Form} from 'react-bootstrap';

export default function SearchInput() {
  return (
    <div>
      <Form.Group>
        <Form.Label>{labelProp}:</Form.Label>
        <ReactTags
          suggestions={suggestionsProp}
          tags={tagsProp}
          onDelete={onDelete}
          onAddition={onAddition}
          noSuggestionsText="User not found; Please enter valid user"
        />
      </Form.Group>
    </div>
  );
}
