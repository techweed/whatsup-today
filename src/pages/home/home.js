import React, { useState, useRef, useCallback } from "react";
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

const Home = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
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
  const observer = useRef();

  //Infinite loading setup
  const lastBookElementRef = useCallback(
    (node) => {
      /** stop if already loading */
      if (loading) return;

      /** after loading disconnect the observer from previous last element */
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        /** condition to trigger when the last node becomes visible and set next page number to call api */
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      /** connect to the new last element */
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  //Search Function
  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  //Navigation to weather page
  const toWeather = () => {
    history.push("/weather");
  };

  //Dynamic rendering of List item
  const RenderItemBody = ({ item }) => (
    <>
      <div className="cardRight">
        <img
          src={
            item.urlToImage
              ? item.urlToImage
              : "https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg"
          }
          className="image"
          alt="Logo"
        />
      </div>
      <div className="cardLeft">
        <div className="cardTitle">{item.title}</div>
        <div className="desc">{item.content}</div>
        <div className="desc-i">{item.author && "-- " + item.author}</div>
      </div>
    </>
  );

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
      <div className="content">
        <div className="input-container">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search"
            className="search"
          ></input>
        </div>
        <img src={calendar} className="calendar" />
        <div className="datePicker">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            inline
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <img src={language} className="language" />

        <ul className="dropdown-menu">
          {query.trim()
            ? languageList.map(renderDataDropDown)
            : countryList.map(renderDataDropDown)}
        </ul>

        <img src={weather} className="weather" onClick={toWeather} />
      </div>
      <div className="content scrollH">
        <span className="categoryHead">Top Stories:</span>
        {categoryList.map((item) => (
          <span className="categoryItem">{item}</span>
        ))}
      </div>
      <div className="ListBody">
        {news.map((item, index) => {
          return (
            <div
              ref={news.length === index + 1 ? lastBookElementRef : null} //when this element is created i.e. as the last element. It invokes callback which it is assigned to, with the element as param.
              key={item.title}
              className="post"
              onClick={() => window.open(item.url, "_blank")}
            >
              <RenderItemBody item={item} />
            </div>
          );
        })}
        <div>{loading && "Loading..."}</div>
        <div>{error && !loading && "Network Error"}</div>
      </div>
    </div>
  );
};

export default Home;
