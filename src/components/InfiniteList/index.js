import React, { useRef, useCallback } from "react";
import "./styles.css";

const InfiniteList = ({ news, loading, error, hasMore, setPageNumber }) => {
  const observer = useRef();

  //Infinite loading setup
  const lastElementRef = useCallback(
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
  return (
    <div className="ListBody">
      {news.map((item, index) => {
        return (
          <div
            ref={news.length === index + 1 ? lastElementRef : null} //when this element is created i.e. as the last element. It invokes callback which it is assigned to, with the element as param.
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
  );
};
export default InfiniteList;
