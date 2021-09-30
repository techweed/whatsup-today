import React, { useState } from "react";
import useNewsSearch from "./useNewsSearch";
import { useHistory } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { weather, language, calendar } from "../../assests/images";
import "./styles.css";
import {
  countryList,
  languageList,
  categoryList,
} from "../../helpers/constants";
import ColorTheme from "../../components/colorTheme";
import InfiniteList from "../../components/InfiniteList";

const Home = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [theme, setTheme] = useState("white");
  const [countryCode, setCountryCode] = useState("in");
  const [languageCode, setLanguageCode] = useState("en");
  const [startDate, setStartDate] = useState(new Date());
  const { news, hasMore, loading, error } = useNewsSearch(
    query,
    pageNumber,
    countryCode,
    languageCode,
    startDate
  );
  const history = useHistory();

  //Search Function
  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  //Navigation to weather page
  const toWeather = () => {
    history.push("/weather");
  };

  //Language Dropdown item
  const renderDataDropDown = (item, index) => {
    return (
      <li
        key={index}
        value={item}
        onClick={() => {
          query.trim()
            ? setLanguageCode(item.slice(-2))
            : setCountryCode(item.slice(-2));
        }}
      >
        <a>{item}</a>
      </li>
    );
  };

  return (
    <div className="homebody">
      <div className="header" style={{ backgroundColor: theme }}>
        <div className="searchBar">
          <ColorTheme setTheme={setTheme} />
          <div className="input-container">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search"
              className="search"
            ></input>
            <ul>
              <li>
                <img src={calendar} className="calendar" alt="calendar" />
                <div className="datePicker">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    inline
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
              </li>
              <li>
                <img src={language} className="language" alt="language" />

                <ul className="dropdown-menu">
                  {query.trim()
                    ? languageList.map(renderDataDropDown)
                    : countryList.map(renderDataDropDown)}
                </ul>
              </li>
            </ul>
          </div>
          <img
            src={weather}
            className="weather"
            onClick={toWeather}
            alt="weather"
          />
        </div>
        <div className="navHeader">
          <span className="scrollH">
            {categoryList.map((item) => (
              <span className="categoryItem">{item.toUpperCase()}</span>
            ))}
          </span>
        </div>
      </div>
      <InfiniteList
        news={news}
        hasMore={hasMore}
        loading={loading}
        error={error}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default Home;
