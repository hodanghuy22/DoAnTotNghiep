import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../assets/css/global.css';

const StarRating = ({ value, onChange }) => {
    const [hover, setHover] = useState(null);
    const labels = ["Rất tệ", "Tệ", "Tạm ổn", "Tốt", "Rất tốt"];

    return (
        <div className="star-rating d-flex flex-row justify-content-center">
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;

                return (
                    <label key={index} className='star-label'>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => onChange(ratingValue)}
                            style={{ display: 'none' }}
                        />
                        <div className="star-container">
                            <FaStar
                                className="star"
                                color={ratingValue <= (hover || value) ? "#ffc107" : "#e4e5e9"}
                                size={30}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                            />
                            <p className="star-label-text">{labels[index]}</p>
                        </div>
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
