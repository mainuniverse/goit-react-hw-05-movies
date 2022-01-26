import { useEffect, useState } from 'react';
import { fetchTakeCast } from '../../services/fetchAPI';

export default function Cast({ moviesId }) {
  const [actors, setActors] = useState([]);
  useEffect(() => {
    fetchTakeCast(moviesId).then(res => {
      setActors(res.cast);
    });
  }, [moviesId]);

  return (
    <>
      {actors && (
        <ul>
          {actors.map(actor => (
            <li key={actor.id} className="listMovies">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                    : 'https://image.tmdb.org/t/p/w200/7rwSXluNWZAluYMOEWBxkPmckES.jpg'
                }
                alt={actor.name}
              />
              <p>{actor.name}</p>
              <p>Character {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}