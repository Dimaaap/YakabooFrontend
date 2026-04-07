import { getDiscount } from "./discount.service"

export const getDiscountedBooks = (books) => {
    return books.filter(
        book => book.price && book.promo_price && book.price > 0 && book.promo_price < book.price
    ).map(book => {
        const discount = getDiscount(book)
        return {
            ...book,
            discount
        }
    })
    .sort((a, b) => b.discount - a.discount)
}
