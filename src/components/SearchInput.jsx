import React, {useState, useRef, useCallback} from 'react';
import {Form, Col, Spinner} from 'react-bootstrap';
import {handleApiQuery} from '../utils';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash.debounce';

export default function SearchInput({queryConfigs, setTableData}) {
  // destructure props
  const {resourceName, label} = queryConfigs;

  // =========Set states=================
  const [suggestions, setSuggestions] = useState('');
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // set a useRef to get the html element
  const elSelector = useRef(null);

  // ================Autosuggest=======================
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion) => suggestion.title;

  // Render suggestions
  const renderSuggestion = (suggestion) => {
    if (isLoading === true)
      return (
        <div className="spinner-wrapper">
          <Spinner className="mt-2 ml-3" animation="border" variant="primary" />
        </div>
      );

    return (
      <button key={suggestion.id} className="dropdown-options-btn">
        {suggestion.avatar ? (
          <img src={suggestion.avatar} alt="avatar" className="avatar" />
        ) : null}
        {suggestion.title}
      </button>
    );
  };

  const onChange = (event, {newValue}) => {
    setValue(newValue);
  };

  // Autosuggest calls this fn every time you need to update suggestions.

  // debounce only fires an api query after x milliseconds of nil user input to the input box, thus helping to avoid hitting the rate limiter
  const debouncedVal = useCallback(
    debounce(
      (currValue) =>
        handleApiQuery(resourceName, currValue, setSuggestions, setIsLoading),
      1000
    ),
    [resourceName]
  );
  //
  const onSuggestionsFetchRequested = ({value: currValue}) => {
    if (isLoading === false) setIsLoading(true);
    debouncedVal(currValue);

    // debouncedVal(currValue);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: 'Your query...',
    value,
    onChange,
  };

  // handle what happens when user selects a suggestion
  const handleSugestionSelected = (
    event,
    {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}
  ) => {
    window.location.href = `${suggestion.linkToSite}`;
  };

  // If the user presses "enter" without choosing any of the suggestions, query the db to get related data, then render a table
  const handleSubmit = (event) => {
    // Stop the page from refreshing
    event.preventDefault();
    // grab hold of the value entered in the input box
    const userInput = elSelector.current.input.value;
    // use the above to query db then render table results
    handleApiQuery(resourceName, userInput, setTableData);
    // move the serach box to the top of the screen
    // render a table of all suggestions
  };
  //===============================================
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} xs={12} controlId="col">
          <Form.Label>Search Github</Form.Label>
          <Autosuggest
            ref={elSelector}
            suggestions={isLoading ? [''] : suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            // decides when to run the render fn
            // This callback controls what happens when user clicks or presses 'enter' on a suggestion
            onSuggestionSelected={handleSugestionSelected}
          />
          <Form.Text className="formText"> {label}</Form.Text>
        </Form.Group>
      </Form.Row>
    </Form>
  );
}
