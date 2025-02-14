import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { PropTypes } from 'prop-types';
import { ProfilePath } from './Cast.styled';

const Cast = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState({cast: []});

    useEffect(() => {
        const fetchCast = async () => {
            try {
                const response = await axios.get(
                  `https://api.themoviedb.org/3/movie/${movieId}/credits`,
                  {
                    headers: {
                      Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
                      Accept: 'application/json',
                    },
                  }
                );
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching cast: ", error);
            }
        }
           
        fetchCast();
    }, [movieId]);

    if (movie.cast.length === 0) {
        return <div>Sorry, the cast is not available for this movie</div>;
    }

    return (
      <div>
        Cast Page
        <ul>
          {movie.cast.map(cas => (
            <li key={cas.id}>
              <ProfilePath
                src={`https://image.tmdb.org/t/p/w500/${cas.profile_path}`}
                alt={cas.original_name}
              />
              <div>
                {cas.original_name}
                <p>Character: {cas.character}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
};

Cast.propTypes = {
    movie: PropTypes.shape({
        cast: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                original_name: PropTypes.string,
                profile_path: PropTypes.string,
                character: PropTypes.string
            })
        )
    }),
}

export default Cast;