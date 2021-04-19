import React, {useState, useRef} from 'react';
import {Container} from 'react-bootstrap';
import DropdownFilter from './DropdownFilter';
import AdditionalInfoTable from './AdditionalInfoTable';
import SearchInput from './SearchInput';
import {REPOS, USERS} from '../utils';

export default function MainSearchPage() {
  // ===========useStates==================
  const [queryMode, setQueryMode] = useState(USERS);
  const [tableData, setTableData] = useState([]);
  // based on the query mode, set the respective query URI and label (the lable prompts the user whether what to type in the input box)
  const getQueryConfigsAccordingToMode = (queryModes) => {
    switch (queryModes) {
      case USERS:
        return {resourceName: USERS, label: 'Enter a username to begin'};
      case REPOS:
        return {resourceName: REPOS, label: 'Enter a repo to begin'};
      default:
        return {
          resourceName: USERS,
          label: 'Enter a username to begin',
        };
    }
  };

  const queryConfigsAccordingToMode = getQueryConfigsAccordingToMode(queryMode);

  return (
    <div className="wrapper-div">
      <video autoPlay loop muted className="background-video">
        <source
          // video credit: github
          src="https://github.githubassets.com/images/modules/site/home/globe-900.h264.mp4"
          type="video/mp4"
        />
      </video>
      {/* <div className="searchBar-wrapper-default"> */}
      <Container
        fluid
        className={`${
          tableData.length
            ? 'main-container-with-table'
            : 'main-container-default'
        } margin-auto mb-0`}>
        <DropdownFilter queryMode={queryMode} setQueryMode={setQueryMode} />
        <SearchInput
          queryConfigs={queryConfigsAccordingToMode}
          setTableData={setTableData}
        />
      </Container>
      {/* </div> */}
      <div
        className={`${
          tableData.length ? 'table-wrapper' : 'table-wrapper-hidden'
        }`}>
        {tableData.length ? (
          <AdditionalInfoTable tableData={tableData} />
        ) : null}
      </div>
    </div>
  );
}
