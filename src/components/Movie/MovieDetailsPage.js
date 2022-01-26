import {
  useParams,
  useLocation,
  useHistory,
  Link,
  Route,
} from 'react-router-dom';
import { useEffect, useState } from 'react';

import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';
import { fetchTakeMoviesById } from '../../services/fetchAPI';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const location = useLocation();
  const history = useHistory();
  const { moviesId } = useParams();
  const [data, setData] = useState(null);
  const prevLocation = location?.state?.from ?? '/';

  useEffect(() => {
    fetchTakeMoviesById(moviesId)
      .then(res => setData(res))
      .catch(error => console.log(error));
  }, [moviesId]);

  function handleMapGenres(genres) {
    return genres.map(genre => <li key={genre.id}> {genre.name} </li>);
  }

  function handleGoBack() {
    history.push(location?.state?.from ?? '/');
  }

  return (
    <>
      {data && (
        <div className={styles.wrapperDetailPage}>
          <button
            onClick={handleGoBack}
            type="button"
            className={styles.buttonGoBack}
          >
            Go back
          </button>

          <section className={styles.mainCard}>
            <img
              src={
                data.poster_path
                  ? `https://image.tmdb.org/t/p/w300/${data.poster_path}`
                  : 'https://image.tmdb.org/t/p/w300/7rwSXluNWZAluYMOEWBxkPmckES.jpg'
              }
              alt={data.title}
            />
            <div className={styles.mainInfo}>
              <h2>{data.title} </h2>
              <p>User score {data.vote_average}</p>
              <h3>Overview</h3>
              <p>{data.overview} </p>
              <h3>Genres</h3>
              <ul>{handleMapGenres(data.genres)}</ul>
            </div>
          </section>
          <hr />
          <p>Additional information </p>
          <ul>
            <li>
              <Link
                to={{
                  pathname: `/movies/${moviesId}/cast`,
                  state: { from: prevLocation },
                }}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: `/movies/${moviesId}/reviews`,
                  state: { from: prevLocation },
                }}
              >
                Reviews
              </Link>
            </li>
          </ul>
          <hr />
          <section>
            <Route path="/movies/:movieId/cast">
              <Cast moviesId={moviesId} />
            </Route>
            <Route path="/movies/:movieId/reviews">
              <Reviews moviesId={moviesId} />
            </Route>
          </section>
        </div>
      )}
      {!data && <div>Загрузка</div>}
    </>
  );
}