import React, { useState, useEffect } from "react";
import axios from "axios";

import SearchInput from "./SearchInput/SearchInput";

import style from "./Searching.module.css";

const Searching = (props) => {
  const [userCountryInput, setCountryInput] = useState("");
  const [uniqCountries, setUniqueCountries] = useState("");
  const [userCityInput, setCityInput] = useState("");
  const [uniqCities, setUniqueCities] = useState("");
  const [userAuthorInput, setAuthorInput] = useState("");
  const [uniqAuthors, setUniqueAuthors] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:8080/feed/getSearchedStories", {
        userAuthorInput: userAuthorInput,
        userCountryInput: userCountryInput,
        userCityInput: userCityInput,
      })
      .then((result) => {
        setUniqueCountries(result.data.countriesSuggestions);
        setUniqueAuthors(result.data.authorsSuggestions);
        setUniqueCities(result.data.citiesSuggestions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userAuthorInput, userCityInput, userCountryInput]);

  const resetInputs = () => {
    setCountryInput("");
    setAuthorInput("");
    setCityInput("");
    props.findStoriesHandler("", "", "");
  };

  const setCountry = (userInput) => {
    setCountryInput(userInput);
  };

  const setAuthor = (userInput) => {
    setAuthorInput(userInput);
  };

  const setCity = (userInput) => {
    setCityInput(userInput);
  };

  let countryInput = <input type="text" placeholder="Choose the country" />;
  let cityInput = <input type="text" placeholder="Choose the city" />;
  let authorInput = <input type="text" placeholder="Choose the author" />;

  if (props.stories) {
    countryInput = (
      <SearchInput
        placeholder={"Choose the country"}
        setInputValue={setCountry}
        userInput={userCountryInput}
        uniqueSuggestions={uniqCountries}
      />
    );
    cityInput = (
      <SearchInput
        placeholder={"Choose the city"}
        setInputValue={setCity}
        userInput={userCityInput}
        uniqueSuggestions={uniqCities}
      />
    );
    authorInput = (
      <SearchInput
        placeholder={"Choose the author"}
        setInputValue={setAuthor}
        userInput={userAuthorInput}
        uniqueSuggestions={uniqAuthors}
      />
    );
  }

  let resetButton = [style.Disabled, style.ResetButton].join(" ");
  if (userAuthorInput !== "" || userCityInput !== "" || userCountryInput !== "")
    resetButton = [style.ResetButton];

  let content = (
    <div className={style.HomeSearchingImage}>
      <div className={style.HomeSearching}>
        <h1>Let the adventures begin</h1>
        <div className={style.SearchingContainer}>
          <div className={style.Searching}>
            {countryInput}
            <h3>or</h3>
            {authorInput}
          </div>
          <button
            type="submit"
            onClick={() =>
              props.searchMiddleware(userCountryInput, userAuthorInput)
            }
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
  if (props.tab !== "Home") {
    content = (
      <>
        <div className={style.SearchingContiner}>
          <h1>{props.activeTab}</h1>
          <div className={style.Searching}>
            {countryInput}
            {cityInput}
            {authorInput}
          </div>
          <div className={style.ButtonContainer}>
            <div className={resetButton} onClick={resetInputs}>
              Reset
            </div>
            <button
              type="submit"
              onClick={() => {
                props.findStoriesHandler(
                  userCountryInput,
                  userCityInput,
                  userAuthorInput
                );
              }}
            >
              Search
            </button>
          </div>
        </div>
      </>
    );
  }

  return <>{content}</>;
};

export default Searching;
