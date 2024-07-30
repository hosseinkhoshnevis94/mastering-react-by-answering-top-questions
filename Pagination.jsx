import React, { useEffect, useState } from 'react';

export default function Pagination() {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${page * limit}`);
        const result = await response.json();
        setData(result.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit, page]);

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage((prevPage) => prevPage - 1);
  };

  const handlePageInput = (e) => {
    e.preventDefault();
    const newPage = Number(e.target.pageInput.value) - 1;
    if (!isNaN(newPage) && newPage >= 0) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <input 
        type="number" 
        value={limit} 
        onChange={(e) => setLimit(Number(e.target.value))} 
        min="1"
      />
      <div>Limit: {limit}</div>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {!loading && !error && (
        <ul>
          {data.map((item, i) => (
            <li key={i}>{item.url}</li>
          ))}
        </ul>
      )}
      <button onClick={handlePrev} disabled={page === 0}>Previous</button>
      <button onClick={handleNext}>Next</button>
      <div>Page: {page + 1}</div>
      <form onSubmit={handlePageInput}>
        <input 
          name="pageInput" 
          type="number" 
          defaultValue={page + 1} 
          min="1" 
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
}
