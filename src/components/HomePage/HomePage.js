import { useEffect, useState } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { fetchTrendingMovies } from '../../services/fetchAPI';

export default function HomePage() {
  const [results, setResults] = useState([]);
  const { url } = useRouteMatch();
  const location = useLocation();

  useEffect(() => {
    fetchTrendingMovies()
      .then(({ results }) => {
        setResults(prev => {
          return [...prev, ...results];
        });
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <ul>
        {results &&
          results.map(result => (
            <li key={result.id} className="listMovies">
              <Link
                to={{
                  pathname: `${url}movies/${result.id}`,
                  state: { from: location },
                }}
              >
                {result.original_title || result.name}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}