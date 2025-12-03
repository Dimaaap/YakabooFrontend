export const FormInput = ({
    id, label, register, errors, placeholder, validation, type="text"
}) => {
    return (
        <div className="checkout__form-input-container">
            <label htmlFor={ id } className="checkout__form-label">
                { label }
            </label>

            <input
                id={ id }
                type={ type }
                placeholder={ placeholder }
                {...register(id, validation)}
                className={`checkout__form-input ${errors.firstName ? "error-input": ""}`}
            />
            { errors[id] && (
                <p className="checkout__form-error-message">
                    { errors[id].message }
                </p>
            ) }
        </div>
    )
}