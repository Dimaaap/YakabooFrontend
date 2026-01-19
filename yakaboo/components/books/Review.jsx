'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { CookiesWorker } from "../../services";
import Endpoints from "../../endpoints";

export const Review = ({ review }) => {
    const MAX_RATE = 5;
    const MAX_COMMENT_LENGTH = 225;
    const isLongText = review.comment.length > MAX_COMMENT_LENGTH;

    const [isExpanded, setIsExpanded] = useState(false);
    const [reviewLikesCount, setReviewLikesCount] = useState(review.likes_count ?? 0);
    const [reviewDislikesCount, setReviewDislikesCount] = useState(review.dislikes_count ?? 0);

    const displayedText = isExpanded || !isLongText ? review.comment : review.comment.slice(0, MAX_COMMENT_LENGTH - 1) + "...";

    const date = new Date(review.created_date);
    const userEmail = CookiesWorker.get("email");

    const formattedDate = new Intl.DateTimeFormat("uk-UA", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(date)

    const handleReaction = async(isLike) => {
        if(!userEmail) return;

        try {
            const res = await fetch(
                Endpoints.ADD_REACTION_TO_REVIEW(review.id, isLike, userEmail),
                {
                    method: "POST",
                    credentials: "include"
                }
            )

            if(!res.ok) throw new Error();

            const data = await res.json();
            
            setReviewLikesCount(data.likes_count);
            setReviewDislikesCount(data.dislikes_count)
        } catch(e) {
            console.error("Reaction error", e);
        }
    }

    

    return(
        <div className="book-container__review review">
            <div className="review__header">
                <div className="review__info-date">
                    <p className="review__author">
                        { review.user_name }
                    </p>
                    <span className="review__date">
                        { formattedDate }
                    </span>
                </div>
                <div className="review__rate">
                    {[...Array(MAX_RATE)].map((_, index) => (
                        <Image key={ index } src={index < review.rate ? "/icons/star.svg" : "/icons/star-inactive.svg"}
                         alt="" width="12" height="12" />
                    ))}
                </div>
            </div>
            <div className="review__text-container">
                <p className="review__title">
                    { review.title }
                </p>
                <p className="review__text">
                    { displayedText }
                </p>
            </div>
                
            <div className="review__footer">
                { isLongText && (
                    <button className="review__read-more-btn"
                    onClick={() => setIsExpanded(prev => !prev)}
                    type="button">
                        { isExpanded ? "Сховати": "Читати повністю" }
                    </button>
                ) }
                <div className="review__like-buttons">
                    <button className={`review__like review__likes`}
                    onClick={() => handleReaction(true)}>
                        <Image src="/icons/like.svg" alt="" width="12" height="12" />
                        { reviewLikesCount }
                    </button>
                    <button className={`review__like review__dislikes`}
                    onClick={() => handleReaction(false)}>
                        <Image src="/icons/dislike.svg" alt="" width="12" height="12" />
                        { reviewDislikesCount }
                    </button>
                </div>
            </div>
        </div>
    )
}