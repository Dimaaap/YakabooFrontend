export const getDiscount = (book) => {
    if(!book?.promo_price || !book?.price || book.promo_price >= book.price){
        return null;
    }

    return Math.round(
        ((book.price - book.promo_price) / book.price) * 100
    );
}

export function sortBooks(books, sortingOrder){
    const sorted = [...books];

    switch(sortingOrder) {
        case "cheap":
            return sorted.sort((a, b) => a.price - b.price);
        case "expensive":
            return sorted.sort((a, b) => b.price - a.price);
        case "discount":
            return sorted.sort((a, b) => compareDiscounts(a, b));
        case "popular":
        default:
            return sorted.sort((a, b) => (b.stars || 0) - (a.stars || 0))
    }
}

const compareDiscounts = (a, b) => {
    const discountA = getDiscount(a);
    const discountB = getDiscount(b); 
    
    if(discountA === null && discountB === null) return 0;
    if(discountA === null) return 1;
    if(discountB === null) return -1;

    return discountB - discountA;
}