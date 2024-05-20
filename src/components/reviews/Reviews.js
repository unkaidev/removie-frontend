import { useEffect, useRef } from 'react';
import { createReview } from '../../services/reviewService';
import { useParams } from 'react-router-dom';
import ReviewForm from '../reviewForm/ReviewForm';
import React from 'react';
import { toast } from 'react-toastify';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, []);

    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;

        try {
            const response = await createReview({ reviewBody: rev.value, imdbId: movieId });
            if (response) {
                toast.success("Review success!")
            }
            const updatedReviews = [...reviews, { body: rev.value }];

            rev.value = "";

            setReviews(updatedReviews);
        }
        catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap mt-4">
                <div className="w-full md:w-1/3">
                    <img src={movie?.poster} alt="Movie Poster" className="w-full h-auto" />
                </div>
                <div className="w-full md:w-2/3 md:pl-4">
                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review" />
                    <hr className="my-4" />
                    {reviews?.map((r, index) => (
                        <div key={index} className="mb-4">
                            <p className="text-lg text-white">{r.body}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
};

export default Reviews;
