import React from "react";

import style from "./WondersFilter.module.css";

import Tag from "./Tag/Tag";

const WondersFilter = ({ filters, filterClicked }) => {
  return (
    <div className={style.Filter}>
      <h1>Filter by Attraction</h1>
      <div className={style.Tags}>
        {filters.map((filter, i) => {
          return (
            <div
              onClick={() => filterClicked(filter.filterName)}
              key={filter.filterName + i}
            >
              <Tag tagName={filter.filterName} active={filter.isValid} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WondersFilter;
