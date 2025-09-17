export const Row = ({ title, children, isFlex=false }) => {
    return(
        <div className="book-container__row">
            <div className="book-container__cell cell-title">
                <p>{ title }</p>
            </div>
            <div className={`book-container__cell ${isFlex ? "flex-cell" : ""}`}>
                { children }
            </div>
        </div>    
    )
    
}