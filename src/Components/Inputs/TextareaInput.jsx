import React from "react";


function TextareaInput(props) {
    return (
        <div className={"d-flex align-items-center flex-column textarea"}>
            <label>
                {props.text}
            </label>
            <textarea
                name={props.name}
                onChange={props.formikData.handleChange}
                value={props.formikData.values[props.name]}
                placeholder={props.text.placeholder}
                className = {props.className}
            />
        </div>
    )
}

export default TextareaInput
