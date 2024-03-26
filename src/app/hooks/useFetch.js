import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const json = await fetch(url).then((r) => r.json());
        setIsLoading(false);
        console.log('Data received:', json);
        setData(json);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();

    // const pollInterval = setInterval(() => {
    //   fetchData();
    // }, 3000);

    // return () => {
    //   clearInterval(pollInterval);
    // };
  }, [url]);

  return { data, error, isLoading };
}
