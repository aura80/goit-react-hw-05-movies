import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PropTypes } from 'prop-types';

const Reviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                  `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
                  {
                    headers: {
                      Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
                      Accept: 'application/json',
                    },
                  }
                );

                setReviews(response.data.results);
            } catch (error) {
                console.error('Error fetching reviews: ', error);
            }
        };

        fetchReviews();
    }, [movieId]);

    if (reviews.length === 0) {
        return (<div>No reviews available for this movie.</div>);
    }

    return (
      <div>
        <h1>Reviews</h1>

        <ul>
          {reviews.map(rev => (
            <li key={rev.id}>
              <h3>Author: {rev.author}</h3>
              <p>{rev.content}</p>
            </li>
          ))}
        </ul>
      </div>
    );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      is: PropTypes.string.isRequired,
      author: PropTypes.string,
      content: PropTypes.string,
    })
  ),
};

export default Reviews;
