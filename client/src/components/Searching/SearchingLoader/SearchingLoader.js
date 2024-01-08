import React from "react";

import style from "./SearchingLoader.module.css";

const SearchingLoader = () => {
  return (
    <>
      <div className={style.SearchingContiner}>
        <h1>Find a story</h1>
        <div className={style.Searching}>
          <div />
          <div />
          <div />
        </div>
        <div className={style.ButtonContainer}>
          <div className={style.Disabled}>Reset</div>
          <button>Search</button>
        </div>
      </div>
    </>
  );
};

export default SearchingLoader;
