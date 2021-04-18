import React, {useState, useEffect, useCallback} from 'react';
import {Form, Row, Col} from 'react-bootstrap';
import {handleApiQuery} from '../utils';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash.debounce';

export default function SearchInput({queryConfigs}) {
  // destructure props
  const {resourceName, label} = queryConfigs;

  // =========Set states=================
  const [suggestions, setSuggestions] = useState('');
  const [value, setValue] = useState('');

  console.log(`suggestions is:`);
  console.log(suggestions);

  // Teach Autosuggest how to calculate suggestions for any given input value.
  // const getSuggestions = (value) => {
  //   console.log(`value in getSuggestions`);
  //   console.log(value);
  //   const inputValue = `${value}`.trim().toLowerCase();
  //   const inputLength = inputValue.length;

  //   return inputLength === 0
  //     ? []
  //     : suggestions.filter(
  //         (suggestion) =>
  //           suggestion.user.toLowerCase().slice(0, inputLength) === inputValue
  //       );
  // };

  // ========API QUERY=============================
  // Whenever value changes, make an api req that returns autocomplete suggestions based on the user input
  // useEffect(() => {
  //   handleApiQuery(value, setSuggestions);
  // }, [value]);

  //===============================================

  // const handleDropdownClick = (suggestionDetails) => {
  //   window.location.href = `${suggestionDetails.linkToSite}`;
  // };

  // ================Autosuggest=======================
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion) => suggestion.title;

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => (
    <button
      key={suggestion.id}
      className="dropdown-options-btn"
      // onClick={() => handleDropdownClick(suggestion)}
    >
      {suggestion.title}
    </button>
  );

  const onChange = (event, {newValue}) => {
    setValue(newValue);
  };

  // strategy to solve rate limiter
  /*
  1. after first key stroke,trigger a countdown timer
  2. if there are subsequent key strokes, reset this timer
  3. when the timer hits 0, trigger an api request
  */

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  // const debouncedVal = debounce(handleApiQuery(value, setSuggestions), 1000);
  const debouncedVal = useCallback(
    debounce(
      (currValue) => handleApiQuery(resourceName, currValue, setSuggestions),
      500
    ),
    [resourceName]
  );
  console.log(`resourceName is:`);
  console.log(resourceName);

  const onSuggestionsFetchRequested = ({value: currValue}) => {
    // setSuggestions(getSuggestions(value));
    debouncedVal(currValue);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: 'Enter your query',
    value,
    onChange,
  };

  // handle what happens when user selects a suggestion
  const handleSugestionSelected = (
    event,
    {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}
  ) => {
    console.log('handling suggestion');
    window.location.href = `${suggestion.linkToSite}`;
  };
  //===============================================
  return (
    <Form.Group>
      <Row>
        <Col xs={12}>
          <Form.Label>Search Github</Form.Label>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            // This callback controls what happens when user clicks or presses 'enter' on a suggestion
            onSuggestionSelected={handleSugestionSelected}
          />
          <Form.Text className="formText"> {label}</Form.Text>
        </Col>
      </Row>
    </Form.Group>
  );
}
