import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../services/API';
import MoviesList from '../../components/MoviesList/MoviesList';

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const receivedTrendingMovies = await getTrendingMovies();
        setMovies(receivedTrendingMovies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrendingMovies();
  }, []);

  return (
    <main>
      <h1>Trending Movies Now</h1>
      {movies && <MoviesList movies={movies} />}
    </main>
  );
};
export default TrendingMovies;
