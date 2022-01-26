import { useEffect, useState } from 'react';
import { fetchTakeReviews } from '../../services/fetchAPI';

export default function Reviews({ moviesId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchTakeReviews(moviesId).then(res => {
      setReviews(res.results);
    });
  }, [moviesId]);

  return (
    <>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <h3> {review.author} </h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>no reviews </div>
      )}
    </>
  );
}