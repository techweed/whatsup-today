import { useEffect, useState } from "react";
import axios from "axios";

const useNewsSearch = (query, pageNumber, countryCode, languageCode) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [news, setNews] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setNews([]);
  }, [query, countryCode, languageCode]);

  useEffect(() => {
    const NEWS_KEY = process.env.REACT_APP_NEWS_API_KEY;
    setLoading(true);
    setError(false);
    let cancel, url, params;
    console.log(query);
    if (query.trim()) {
      url = "https://newsapi.org/v2/everything";
      params = {
        q: query.trim(),
        from: "2021-09-23",
        sortBy: "popularity",
        page: pageNumber,
        apiKey: NEWS_KEY,
        language: languageCode,
      };
    } else {
      url = "https://newsapi.org/v2/top-headlines";
      params = { country: countryCode, page: pageNumber, apiKey: NEWS_KEY };
    }

    axios({
      method: "GET",
      url: url,
      params: params,
      /** feature from axios to cancel a request */
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setNews((prevNews) => {
          return [...prevNews, ...res.data.articles];
        });
        setHasMore(res.data.articles.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        /** checking if the error is axios cancellation */
        if (axios.isCancel(e)) return;
        setError(true);
        setLoading(false);
      });
    /** cancel the previous request if a new one is called immediately i.e. invoking useEffect again */
    return () => cancel();
  }, [query, pageNumber, countryCode, languageCode]);

  return { loading, error, news, hasMore };
};
export default useNewsSearch;
