import { useState, useEffect } from "react";
import { Outlet, useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  PosterPath,
  DetailsDiv,
  Side,
  StyledBackLink,
  Line,
  LinkStyle,
} from './MovieDetails.styled.js';

const MovieDetails = () => {
  const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(false);
  const location = useLocation();
  const backToHome = location.state?.from ?? '/';
  // it keeps and restore the results when we go back to the search page
  const searchResults = location.state?.searchResults ?? [];
  // it keeps and restore the search term when we go back to the search page
  const searchQuery = location.state?.searchQuery ?? '';
  console.log('Navigation state:', {
    backToHome,
    searchResults,
    searchQuery,
  });

  useEffect(() => {
    console.log(`Fetching details for movie ID: ${movieId}`);
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
              Accept: 'application/json',
            },
          }
        );

          setMovie(response.data);
          // resets the error state if the movie is found
          setError(error);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log('Error 404, movie not found or invalid API key: ', error);
        } else {
            console.error('Error fetching details: ', error);
            // sets the error state to true
            setError(true);
        }
      }
    };

    fetchDetails();
  }, [movieId]);

  if (movie && Object.keys(movie)?.length === 0) {
    return (
      <div>
        Sorry, this movie is not available
        <StyledBackLink to={backToHome}>Go back</StyledBackLink>
      </div>
    );
  }

  if (!movie) {
      return (
        <div>
          <StyledBackLink to={backToHome}>Go back</StyledBackLink>
              <p>Loading...</p>
              <p>This movie could not exist</p>
        </div>
      );
  }

  return (
    <>
      <StyledBackLink to={backToHome} state={{ searchResults, searchQuery }}>
        Go back
      </StyledBackLink>
      <DetailsDiv>
        <PosterPath
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <Side>
          <h1>{movie.title}</h1>
          <p>User score: {movie.vote_average * 10}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p> {movie.genres.map(genre => genre.name).join(' ')}</p>
        </Side>
      </DetailsDiv>
      <>
        <h2>Additional information</h2>
        <ul>
          <li>
            <LinkStyle
              to="cast"
              state={{ from: backToHome, searchResults, searchQuery }}
            >
              Cast
            </LinkStyle>
          </li>
          <li>
            <LinkStyle
              to="reviews"
              state={{ from: backToHome, searchResults, searchQuery }}
            >
              Reviews
            </LinkStyle>
          </li>
        </ul>
        <Line />
      </>

      <Outlet />
    </>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string
      })
    ),
  }),
    location: PropTypes.shape({
        state: PropTypes.shape({
            from: PropTypes.string,
            searchResults: PropTypes.array,
            searchQuery: PropTypes.string
      })
  }),
};

export default MovieDetails;