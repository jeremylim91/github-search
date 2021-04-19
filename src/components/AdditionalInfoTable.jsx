import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import moment from 'moment';

export default function AdditionalInfoTable({tableData}) {
  const handleButtonClick = (link) => {
    window.location.href = `${link}`;
  };

  const Content = () => {
    // guard clause: if the tableData is empty, just return
    if (tableData.length < 1) return null;

    // else if not empty, arrange table data into rows and cols

    return tableData.map((datum) => (
      <Row className="mt-3 pb-2 border-bottom">
        <Col xs={12}>
          <button
            className="dropdown-options-btn"
            onClick={() => handleButtonClick(datum.linkToSite)}>
            {/* display the user's avatar */}
            {datum.avatar ? (
              <img src={datum.avatar} alt="avatar" className="avatar" />
            ) : null}
            {/* display the user's name */}
            <span style={{fontWeight: 'bold'}}>{datum.title}</span>
            {datum.userName ? <span>/{datum.userName}</span> : null}
          </button>
        </Col>
        {/* Display the number of starGazers */}
        {datum.numStarGazers ? <Col xs={2}> {datum.numStarGazers}</Col> : null}
        {datum.numDownloads ? (
          <Col xs={2}> Downloads: {datum.numDownloads}</Col>
        ) : null}
        {/* Display the last time a repo was updated */}
        {datum.updatedDate ? (
          <Col xs={3}>
            Updated on {moment(datum.updatedDate).format('D/MMM/YY')}
          </Col>
        ) : null}
        {/* Display the language used for this repo */}
        {datum.language ? <Col xs={2}>{datum.language}</Col> : null}
        {/* Display number for followers this user has */}
        {datum.numFollowers ? (
          <Col xs={12}>{datum.numFollowers} followers</Col>
        ) : null}
      </Row>
    ));
  };
  return (
    <Container>
      <Content />
    </Container>
  );
}
