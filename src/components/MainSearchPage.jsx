import React, {useState} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import DropdownFilter from './DropdownFilter';
import SearchInput from './SearchInput';
import AsyncPagination from './AsyncPagination';
import {
  QUERY_REPO,
  QUERY_USER,
  SEARCH_USERS_URI,
  SEARCH_REPOS_URI,
} from '../utils';

export default function MainSearchPage() {
  // ===========useStates==================
  const [queryMode, setQueryMode] = useState(QUERY_USER);

  // based on the query mode, set the respective query URI and label (the lable prompts the user whether what to type in the input box)
  const getQueryConfigsAccordingToMode = (queryModes) => {
    switch (queryModes) {
      case QUERY_USER:
        return {uri: SEARCH_USERS_URI, label: 'Enter a username to begin'};
      case QUERY_REPO:
        return {uri: SEARCH_REPOS_URI, label: 'Enter a repo name'};
      default:
        return {uri: SEARCH_USERS_URI, label: 'Enter a username to begin'};
    }
  };

  const queryConfigsAccordingToMode = getQueryConfigsAccordingToMode(queryMode);

  console.log(queryConfigsAccordingToMode);
  return (
    <div className="wrapper-div">
      {/* <video autoPlay loop muted className="background-video">
        <source
          // video credit: github
          src="https://github.githubassets.com/images/modules/site/home/globe-900.h264.mp4"
          type="video/mp4"
        />
      </video> */}
      <div className="container-wrapper">
        <Container className="main-container margin-auto mt-4 p-4 ml-auto mr-auto">
          <DropdownFilter queryMode={queryMode} setQueryMode={setQueryMode} />
          <SearchInput queryConfigs={queryConfigsAccordingToMode} />
        </Container>
      </div>
    </div>
  );
}
