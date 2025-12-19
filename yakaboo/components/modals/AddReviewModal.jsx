import Image from "next/image"
import { CookiesWorker } from "../../services";

const AddReviewModal = ({ bookInfo }) => {

    const MAX_RATE = 5;
    const USER_NAME = CookiesWorker.get('first_name') || "";

   return(
    <div className="menu add-review">
        <div className="add-to-wishlist__content add-review">
            <button className="menu__close add-review__close" 
            type="button">
                <Image src="/icons/close-smaller.svg"
                alt=""
                width="22"
                height="22"
                onClick={() => setIsAddToWishlistModalOpen(false)}
                />
            </button>
            <h4 className="add-review__header">
                Додати відгук
            </h4>

            <div className="add-review__book-info">
                <div className="add-review__book-image-container">
                    <Image src={ bookInfo.image_src } />
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
                        <Image key={ index } src="/icons/star.svg" alt="" width="18" height="19" />
                    ))}    
                </div>
                <span className="add-review__rate-text">
                    Натисність на зірочку для оцінювання
                </span>
            </div>

            <form className="add-review__data">
                <div className="add-review__data-form-container">
                    <input className="add-review__data-form-input"
                    type="text" placeholder="" value={USER_NAME} />
                </div>
                <div className="add-review__data-form-container">
                    <input type="text" className="add-review__data-form-input"
                    placeholder="Введіть назву для відгуку" />
                </div>
                <div className="add-review__data-form-container">
                    <textarea className="add-review__data-form-input textarea"
                    placeholder="Введіть коментар" rows={5}>

                    </textarea>
                </div>
                <button type="button" className="add-review__data-form-submit">
                    Створити відгук
                </button>
            </form>
        </div>
    </div> 
   )
   
}

export default AddReviewModal;