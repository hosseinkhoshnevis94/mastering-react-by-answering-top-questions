import React, { useEffect, useState } from "react";
//render props pattern
function DataFetcher({ children, url }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    function fetching() {
      setIsLoading(true);
      fetch(url)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    }
    fetching();
  }, [url]);

  return children({ data, isLoading, error });
}

export function UserList({ url }) {
  return (
    <DataFetcher url={url}>
      {({ data, isLoading, error }) => {
        if (isLoading) return <div>loaing</div>;
        if (error) return <div>ERROR</div>;
        return (
          <ul>
            {data.map((item) => (
              <li>
                {item.id}-{item.name}
              </li>
            ))}
          </ul>
        );
      }}
    </DataFetcher>
  );
}
export function PostList({ url }) {
  return (
    <DataFetcher url={url}>
      {({ data, isLoading, error }) => {
        if (isLoading) return <div>loaing</div>;
        if (error) return <div>ERROR</div>;
        return (
          <ul>
            {data.map((item) => (
              <li>
                {item.id}-{item.title}
              </li>
            ))}
          </ul>
        );
      }}
    </DataFetcher>
  );
}


