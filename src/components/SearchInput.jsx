import React, {useState, useEffect} from 'react';
import {Form} from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import sampleSuggestions from '../suggestions';
export default function SearchInput(props) {
  const {labelProp} = props;
  // =========Set states=================
  const [suggestions, setSuggestions] = useState(sampleSuggestions);
  const [value, setValue] = useState('');

  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = (value) => {
    const inputValue = `${value}`.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : sampleSuggestions.filter(
          (suggestion) =>
            suggestion.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion) => suggestion.name;

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  const onChange = (event, {newValue}) => {
    setValue(newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({value}) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  console.log(`suggestions are:`);
  console.log(suggestions);
  console.log(`value is:`);
  console.log(value);
  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: 'Type a programming language',
    value,
    onChange,
  };
  return (
    <div>
      <Form.Group>
        <Form.Label>{labelProp}:</Form.Label>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </Form.Group>
    </div>
  );
}
