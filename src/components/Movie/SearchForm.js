import { useState } from 'react';
import styles from './MoviesPage.module.css';

export default function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChangeQuery = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={query}
        onChange={handleChangeQuery}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
}