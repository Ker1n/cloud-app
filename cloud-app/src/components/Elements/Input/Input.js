import React from 'react';
import './Input.scss';


export const Input = ({label, width, type, value, changeValue}) => {

    

    return (
     <div className="group" style={{width:width}}>
            <div className="group__wrapper">      
            <input type={type} required value={value} onChange={e => changeValue(e.target.value)}  />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>{label}</label>
      </div>
     </div>
    )
}
