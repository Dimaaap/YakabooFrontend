export const Checkbox = ({ id, label, register }) => {
    return(
        <div className="checkout__form-input-container horizontalized">
            <label htmlFor={ id } 
            className="checkout__form-custom-checkbox">
                <input 
                    type="checkbox"
                    id={ id }
                    {...register(id)}
                    className="checkout__form-custom-checkbox-input"
                />
                <span className="checkout__form-custom-checkbox-checkmark"></span>
                { label }
            </label>    
        </div>
    )
}