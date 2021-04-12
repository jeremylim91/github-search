import React from 'react';
import {Dropdown, Row, Col} from 'react-bootstrap';
import {queryTypeOptions} from '../utils';

export default function DropdownFilter() {
  const ManageFilterDropdown = (filter, dropdownOptions, relevantSetState) =>
    dropdownOptions.map((elem) =>
      elem !== filter ? (
        <Dropdown.Item
        // onClick={(e) => manageDropdownBtnClick(elem, relevantSetState)}
        >
          {elem}
        </Dropdown.Item>
      ) : (
        ''
      )
    );

  const queryType = 'Users';

  return (
    <Row>
      <Col xs={2}>Query by:</Col>
      <Col xs={2}>
        <Dropdown>
          <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            Name of filter
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {ManageFilterDropdown(
              queryType,
              queryTypeOptions /*, setQueryType*/
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
}
