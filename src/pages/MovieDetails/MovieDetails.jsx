import { useState, useEffect, Suspense } from 'react';
import { useLocation, useParams, Outlet, Link } from 'react-router-dom';
import { getMovieDetails } from 'services/API';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const location = useLocation();
  const goBackLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getMovieDetails(movieId);
        setMovieInfo(details);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetails();
  }, [movieId]);

  if (!movieInfo) {
    return;
  }

  return (
    <>
      <Link to={goBackLinkHref}>
        <button type="button" className="Button">
          Go back
        </button>
      </Link>
      {movieInfo && (
        <div>
          <img
            src={'https://image.tmdb.org/t/p/w500' + movieInfo.poster_path}
            alt={movieInfo.original_title}
            width="300px"
          />
          <div>
            <h1>{movieInfo.title}</h1>
            <p>User score: {(movieInfo.vote_average * 10).toFixed(2)}%</p>
            <h2>Overview</h2>
            <p>{`${movieInfo.overview}`}</p>
            <h2>Genres</h2>
            <ul>
              {movieInfo.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <hr />
      <div>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <hr />
        <Suspense fallback={<div>Loading subpage...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default MovieDetails;
