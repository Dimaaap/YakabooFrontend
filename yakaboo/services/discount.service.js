export const getDiscount = (book) => {
    if(!book?.promo_price || !book?.price || book.promo_price >= book.price){
        return null;
    }

    return Math.round(
        ((book.price - book.promo_price) / book.price) * 100
    );
}