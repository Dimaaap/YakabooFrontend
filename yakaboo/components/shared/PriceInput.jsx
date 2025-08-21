export const PriceInput = ({ label, onChange, price }) => {
    return(
        <div className="filters__row">
            <span className="filters__price-label">{ label }</span>
            <input 
            type="text" 
            className="filters__price-field" 
            value={ price }
            onChange={ onChange }/>
        </div>
    )
}