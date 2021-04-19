import React from 'react';
import {Dropdown, Row, Col} from 'react-bootstrap';
import {queryTypeOptions} from '../utils';

export default function DropdownFilter({queryMode, setQueryMode}) {
  const manageDropdownBtnClick = (mode, relevantSetState) => {
    relevantSetState(mode);
  };

  const ManageFilterDropdown = (currFilter, relevantSetState) =>
    queryTypeOptions.map((elem) =>
      elem !== currFilter ? (
        <Dropdown.Item
          onClick={(e) => manageDropdownBtnClick(elem, relevantSetState)}>
          {elem}
        </Dropdown.Item>
      ) : (
        ''
      )
    );

  return (
    <Row>
      <Col xs={5} md={3} className="d-flex align-items-center">
        <span>Filter by:</span>
      </Col>
      <Col xs={7} md={5}>
        <Dropdown>
          <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
            {queryMode}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {ManageFilterDropdown(queryMode, setQueryMode /*, setQueryType*/)}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
}
