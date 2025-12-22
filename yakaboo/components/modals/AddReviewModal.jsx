"use client"

import Image from "next/image"
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { CookiesWorker } from "../../services";
import { useAddReviewModalStore } from "../../states";
import { useBlockBodyScroll } from "../../hooks";
import Endpoints from "../../endpoints";

const AddReviewModal = ({ bookInfo, bookId, userEmail }) => {

    const MAX_RATE = 5;
    const USER_NAME = CookiesWorker.get('first_name') || "";

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [currentRate, setCurrentRate] = useState(5);
    const [userName, setUserName] = useState(USER_NAME);
    
    const { isAddReviewModalOpen, setIsAddReviewModalOpen } = useAddReviewModalStore();
    useBlockBodyScroll(isAddReviewModalOpen);

    const onSubmit = async (data) => {
        let rateObj = { rate: currentRate }
        const result = {
            ...data,
            ...rateObj,
            book_id: bookId,
            user_email: userEmail
        };
        
        try{
            const res = await fetch(Endpoints.ADD_REVIEW, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(result)
            });

            if(!res.ok){
                throw new Error("Failed to add review");
            }

            const responseData = await res.json();
            setIsAddReviewModalOpen(false); 
        } catch(err){
            console.error("error", err)
        }
    }

   return(
    <div className="menu add-review">
        <div className="add-to-wishlist__content add-review__content">
            <button className="menu__close add-review__close" 
            type="button">
                <Image src="/icons/close-smaller.svg"
                alt=""
                width="22"
                height="22"
                onClick={() => setIsAddReviewModalOpen(false)}
                />
            </button>
            <h4 className="add-review__header">
                Додати відгук
            </h4>

            <div className="add-review__book-info">
                <div className="add-review__book-image-container">
                    <Image src={ bookInfo.image_src } alt="" width="40" height="40" />
                </div>
                <div className="add-review__book-info-text">
                    <p className="add-review__book-title">
                        { bookInfo.title }
                    </p>
                    <span className="add-review__author">
                        { bookInfo.author }
                    </span>
                    <span className="add-review__format">
                        { bookInfo.format }
                    </span>
                </div>
            </div>

            <div className="add-review__rate">
                <div className="add-review__rate-stars">
                    {[...Array(MAX_RATE)].map((_, index) => (
                        <Image key={ index } src={`${index < currentRate ? "/icons/star.svg" : "/icons/star-inactive.svg"}`} 
                        alt="" width="18" height="19" onClick={() => setCurrentRate(index + 1)} />
                    ))}    
                </div>
                <span className="add-review__rate-text">
                    Натисність на зірочку для оцінювання
                </span>
            </div>

            <form className="add-review__data" onSubmit={handleSubmit(onSubmit)}>
                <div className="add-review__data-form-container">
                    <input className={`add-review__data-form-input ${errors.user_name?.message ? "invalid": ""}`} 
                    {...register("user_name", {required: "Коментар обов'язковий"})}
                    type="text" placeholder="Ваше ім'я (відображається на сайті)" value={userName} onChange={(e) => {setUserName(e.target.value)}} />
                    { errors.user_name?.message && (
                        <span className="add-review__data-error">
                            { errors.user_name.message }
                        </span>) }
                </div>
                <div className="add-review__data-form-container">
                    <input type="text" className={`add-review__data-form-input ${errors.title?.message ? "invalid": ""}`} 
                    {...register("title", {
                        required: "Поле обов'язкове",
                        maxLength: {
                            value: 190,
                            message: "Надто довга назва. Максимум - 190 символів"
                        }
                    })
                    }
                    placeholder="Введіть назву для відгуку" />
                    { errors.title?.message && (
                        <span className="add-review__data-error">
                            { errors.title.message }
                        </span>
                    ) }
                </div>
                <div className="add-review__data-form-container">
                    <textarea className={`add-review__data-form-input textarea ${errors.comment?.message ? "invalid" : ""}`}
                    placeholder="Введіть коментар" rows={5}
                    {...register("comment", {
                        required: "Коментар обов'язковий",
                        maxLength: {
                            value: 1000,
                            message: "Завеликий коментар. Максимум - 10 символів."
                        }
                    })}
                    >
                    </textarea>
                    { errors.comment?.message && (
                        <span className="add-review__data-error">
                            { errors.comment.message }
                        </span>
                    ) }
                </div>
                <button type="submit" className="add-review__data-form-submit">
                    Створити відгук
                </button>
            </form>
        </div>
    </div> 
   )
   
}

export default AddReviewModal;