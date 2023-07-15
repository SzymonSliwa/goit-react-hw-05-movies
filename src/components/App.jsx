import React, { useState, Suspense, lazy } from 'react';

import { getSearchedMovies } from '../services/API';

import { Routes, Route, NavLink, Navigate } from 'react-router-dom';

const Searchbar = lazy(() => import('../pages/Searchbar/Searchbar'));
const MovieDetails = lazy(() => import('../pages/MovieDetails/MovieDetails'));
const TrendingMovies = lazy(() =>
  import('../pages/TrendingMovies/TrendingMovies')
);
//const MoviesList = lazy(() => import('./MoviesList/MoviesList'));
const Cast = lazy(() => import('../components/Cast/Cast'));
const Reviews = lazy(() => import('../components/Reviews/Reviews'));

const App = () => {
  const [setPage] = useState(1);
  const [setSearch] = useState('');

  const handleSubmit = ({ search }) => {
    if (search === '') {
      getSearchedMovies();
    }
    setSearch(search);
    setPage(1);
  };

  return (
    <>
      <div className="Container">
        <nav className="Navigation">
          <NavLink to="/" end>
            {`Home      `}
          </NavLink>
          <NavLink to="/movies">Movies</NavLink>
        </nav>
        <Suspense fallback={<div>Loading page...</div>}>
          <Routes>
            <Route path="/" element={<TrendingMovies />} />
            <Route
              path="/movies"
              element={<Searchbar searchMovies={handleSubmit} />}
            ></Route>
            <Route path="/movies/:movieId" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
