"use client";

import Select from "react-select";
import { selectFieldsCommonStyles } from "../../services/characteristicsMap.service";

export const SelectField = ({ id, options, value, onChange, placeholder, label }) => {
    return(
        <div className="checkout__form-input-container">
            <label htmlFor={ id } className="checkout__form-label">
                { label }
            </label>
            <Select
                id={ id } name={ id }
                options={ options } value={ value }
                onChange={onChange}
                placeholder={ placeholder }
                className="delivery-modal__input"
                styles={ selectFieldsCommonStyles }
            />
        </div>
    )
}