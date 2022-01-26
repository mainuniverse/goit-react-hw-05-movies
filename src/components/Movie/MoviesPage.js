import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import qs from 'query-string';

import SearchForm from './SearchForm';
import { fetchMoviesOnKeyWord } from '../../services/fetchAPI';

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const [searchQuery, setSearchQuery] = useState(
    qs.parse(location.search)?.query || '',
  );
  const [movies, setMovies] = useState([]);

  const onChangeState = query => {
    setSearchQuery(query);
    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    fetchMoviesOnKeyWord(searchQuery)
      .then(resp => {
        setMovies(resp.results);
      })
      .catch(error => console.log(error));
  }, [searchQuery]);

  return (
    <>
      <SearchForm onSubmit={onChangeState} />
      {movies && (
        <ul>
          {movies.map(result => (
            <li key={result.id} className="listMovies">
              <Link
                to={{
                  pathname: `${url}/${result.id}`,
                  state: { from: location },
                }}
              >
                {result.original_title || result.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}