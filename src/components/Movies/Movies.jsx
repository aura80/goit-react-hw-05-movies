import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { StyledLink, Li } from './Movies.styled';

const Movies = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const inputRef = useRef(null);

    useEffect(() => {
        if (location.state?.searchResults && location.state?.searchQuery) {
            console.log('Restoring state:', location.state);
            setSearchResults(location.state.searchResults);
            setSearchQuery(location.state.searchQuery);
        }
    }, [location.state]);

    // input active from the start
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleSearchFilterSubmit = async event => {
        event.preventDefault();
        try {
            const response = await axios.get(
                'https://api.themoviedb.org/3/search/movie',
                {
                params: {
                    query: searchQuery,
                    include_adult: false,
                    language: 'en-US',
                    page: 1,
                },
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
                    Accept: 'application/json',
                },
                }
        );

            setSearchResults(response.data.results);
            // if (inputRef.current) {
            //     // resets the input value directly in DOM without changing the state of the searchQuery
            //     inputRef.current.value = '';
            //     // setSearchQuery('');
            // }
        } catch (error) {
            console.log('Error fetching movies: ', error);
            setSearchResults([]);
        }
    };

    const handleSearchValueChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
      <div>
        <form onSubmit={handleSearchFilterSubmit}>
            <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            placeholder=""
            onChange={handleSearchValueChange}
          ></input>
          <button type="submit">Search</button>
        </form>
        <ul>
            {searchResults.map(movie => (
                <Li key={movie.id}>
                    <StyledLink to={`/movies/${movie.id}`}
                        state={{ from: "/movies", searchResults, searchQuery }}>
                        {movie.title || movie.name}
                    </StyledLink>
                </Li>
            ))
            }  
        </ul>
      </div>
    );
};

Movies.propTypes = {
    searchQuery: PropTypes.string,
    searchResults: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string,
            name: PropTypes.string
        })
    ),
    location: PropTypes.shape({
        state: PropTypes.shape({
            from: PropTypes.string,
            searchResults: PropTypes.array,
            searchQuery: PropTypes.string
      })
  }),
}

export default Movies;
