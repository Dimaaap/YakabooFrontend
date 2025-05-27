import React from 'react'

export const FilterForm = ({fields, formTitle, isScroll=false}) => {
  return (
    <form className="filters__form">
        <p className="filters__form-title">
            { formTitle }
        </p>
        { isScroll ? (
           <div className="filters__form-scroll">
                { fields.map((field, index) => (
                    <div className="filters__form-field" key={index}>
                        <label className="filters__form-label custom-checkbox">
                            <input type="checkbox" className="filters__form-checkbox" />
                            <span className="filters__form-custom-box"></span>
                            { field }
                        </label>
                    </div>
                )) }    
            </div> 
        ) : (
            <>
                { fields.map((field, index) => (
                    <div className="filters__form-field" key={ index }>
                        <label className="filters__form-label custom-checkbox">
                            <input type="checkbox" className="filters__form-checkbox" />
                            <span className="filters__form-custom-box"></span>
                            { field }
                        </label>
                    </div>
                )) }
            </>
        )}
    </form>
  )
}

