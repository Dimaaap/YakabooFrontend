import React from 'react'

export const SliderCountBar = ({ objectList, index, setIndex, visible }) => {
  
    const maxIndex = Math.max(0, objectList.length - visible);
  
    return (
    <div className="slider-count-bar">
        { Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <span  key={i}
            className={`bar ${index === i ? 'active': ""}`} 
            onClick={() => setIndex(i)}/>
        ))}
    </div>
  )
}