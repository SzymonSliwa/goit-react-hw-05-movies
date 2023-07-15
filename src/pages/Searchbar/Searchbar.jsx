import propTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getSearchedMovies } from '../../services/API';
import MoviesList from '../../components/MoviesList/MoviesList';

const Searchbar = ({ searchMovies }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const searchedMovieName = searchParams.get('query');

  useEffect(() => {
    if (search) {
      const onMovieSearch = async () => {
        try {
          const searchMovie = await getSearchedMovies(search);
          setMovies(searchMovie);
        } catch (error) {
          console.log(error);
        }
      };
      onMovieSearch();
    }
  }, [search]);

  useEffect(() => {
    //   console.log(searchedMovieName);
    if (searchedMovieName) {
      const onMovieSearch = async () => {
        try {
          const searchMovie = await getSearchedMovies(searchedMovieName);
          setMovies(searchMovie);
        } catch (error) {
          console.log(error);
        }
      };
      onMovieSearch();
    }
  }, [searchedMovieName]);

  const handleSubmit = ev => {
    ev.preventDefault();
    searchMovies({ search });
    const form = ev.target;
    const formInputValue = form.elements.search.value.toLowerCase();
    setSearchParams(formInputValue !== '' ? { query: formInputValue } : {});
    resetForm();
  };

  const handleSearchChange = ev => {
    setSearch(ev.currentTarget.value);
  };

  const resetForm = () => {
    setSearch('');
  };

  return (
    <header className="Searchbar">
      <form className="Form" onSubmit={handleSubmit}>
        <button type="submit" className="Button">
          <span className="Button-label">Search</span>
        </button>

        <input
          className="Input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          name="search"
          key={nanoid}
          value={search}
          onChange={handleSearchChange}
        />
      </form>
      {movies && <MoviesList movies={movies} />}
    </header>
  );
};

Searchbar.propTypes = {
  searchMovies: propTypes.func.isRequired,
};

export default Searchbar;
