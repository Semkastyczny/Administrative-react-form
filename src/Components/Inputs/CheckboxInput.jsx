import React from "react";


function CheckboxInput(props) {
    return (
        <div className={"d-flex align-items-center flex-column"}>
            <label>{props.text}</label>
            <input type={"checkbox"} name={props.name} onClick={props.onClick} onChange={props.onChange ? props.onChange : null}/>
        </div>

    )

}

export default CheckboxInput
