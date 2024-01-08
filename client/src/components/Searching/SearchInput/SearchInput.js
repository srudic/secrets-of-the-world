import React, { useState } from "react";

import style from "./SearchInput.module.css";
import { FaFlag } from "react-icons/fa";

const SearchInput = ({
  setInputValue,
  userInput,
  uniqueSuggestions,
  placeholder,
  homePage,
  disabled,
}) => {
  const [inputFocus, setInputFocus] = useState(false);

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  const countryClickedHandler = (country) => {
    setInputValue(country);
  };

  let suggestions = null;
  // console.log(uniqueSuggestions);
  if (uniqueSuggestions) {
    suggestions = uniqueSuggestions.map((suggestion) => {
      return (
        <div
          key={suggestion}
          onMouseDown={() => countryClickedHandler(suggestion)}
          className={style.Country}
        >
          <FaFlag />
          <h2>{suggestion}</h2>
        </div>
      );
    });
  }

  let returnInput = (
    <div className={style.CountriesContainer}>
      <input
        placeholder={placeholder}
        onChange={inputHandler}
        onFocus={() => {
          setInputFocus(true);
        }}
        onBlur={() => {
          setInputFocus(false);
        }}
        value={userInput}
      />
      {inputFocus ? <div className={style.Countries}>{suggestions}</div> : null}
    </div>
  );

  if (homePage) {
    returnInput = (
      <>
        <input
          disabled={disabled}
          style={{
            backgroundColor: `${disabled ? "var(--mainBlue)" : "white"}`,
            opacity: `${disabled ? "0.35" : "1"}`,
          }}
          placeholder={placeholder}
          onChange={inputHandler}
          onFocus={() => {
            setInputFocus(true);
          }}
          onBlur={() => {
            setInputFocus(false);
          }}
          value={userInput}
        />
        <div className={style.CountriesContainer}>
          {inputFocus ? (
            <div className={style.CountriesHomePage}>{suggestions}</div>
          ) : null}
        </div>
      </>
    );
  }

  return <>{returnInput}</>;
};

export default SearchInput;
