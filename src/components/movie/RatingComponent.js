import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import { searchMoviesRating, rateMovie } from '../../services/movieService';
import "./Rating.css";
import { useSelector } from 'react-redux';

const RatingStar = ({ imdbId, onClick }) => {
    const account = useSelector(state => state.user.dataRedux.account);
    const isAuthenticated = useSelector(state => state.user.dataRedux.isAuthenticated);

    const [ratingValue, setRatingValue] = useState(0);

    useEffect(() => {
        searchMoviesRating(imdbId)
            .then(response => {
                setRatingValue(response);
            })
            .catch(error => {
                console.error('Error loading rating:', error);
            });
    }, [imdbId]);

    return (
        <div onClick={onClick} className="flex items-center cursor-pointer relative">
            <img
                src="/star.png"
                title="Rating"
                className="star-img"
            />
            {account && isAuthenticated ?

                <span
                    title="Rating"
                    className='text-red-700 absolute top-2 left-2 ml-1 mt-1'>{ratingValue.toFixed(1)}
                </span>
                :
                <span
                    title="Login to Rating"
                    className='text-red-700 absolute top-2 left-2 ml-1 mt-1'>{ratingValue.toFixed(1)}
                </span>
            }


        </div>


    );
};




const RatingComponent = ({ imdbId, onUpdateRating }) => {
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);

    useEffect(() => {
        searchMoviesRating(imdbId)
            .then(response => {
                setValue(response);
            })
            .catch(error => {
                console.error('Error loading rating:', error);
            });
    }, [imdbId]);

    const labels = {
        0.5: 'Very poor',
        1: 'Poor',
        1.5: 'Not good',
        2: 'Fair',
        2.5: 'Average',
        3: 'Good',
        3.5: 'Quite good',
        4: 'Very good',
        4.5: 'Excellent',
        5: 'Outstanding'
    };

    const handleRatingChange = (event, newValue) => {
        setValue(newValue);
        onUpdateRating(imdbId, newValue);
    };

    return (
        <div>
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                emptyIcon={<StarIcon style={{ color: 'white' }} fontSize="inherit" />}
                onChange={handleRatingChange}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
            />
            {value !== null && (
                <Box sx={{ ml: 2, color: 'white', textAlign: 'center' }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </div>
    );
};

export { RatingComponent, RatingStar };
