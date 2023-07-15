import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieCredits } from '../../services/API';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const getActors = await getMovieCredits(movieId);
        setCast(getActors);
      } catch (error) {
        console.log(error);
      }
    };
    fetchActors();
  }, [movieId]);

  return (
    <div>
      {cast.length !== 0 && (
        <ul>
          {cast &&
            cast.map(actor => (
              <li key={actor.id}>
                <img
                  width="200px"
                  src={
                    actor.profile_path ? (
                      'https://image.tmdb.org/t/p/w500' + actor.profile_path
                    ) : (
                      <p>Image not found </p>
                    )
                  }
                  alt={actor.name}
                />
                <p> {actor.name}</p>
                <p>Character: {actor.character}</p>
              </li>
            ))}
        </ul>
      )}
      {cast.length === 0 && (
        <div>We don't have cast information for this movie</div>
      )}
    </div>
  );
};

export default Cast;
