function TextInput(props) {
    return (
        <div className={"d-flex align-items-center flex-column"}>
            <label className="textInputWrapper">
                {props.text}
            </label>
            <input 
                type = {props.type}
                name = {props.name}
                className = {props.className}
                onChange = {props.formikData.handleChange}
                value = {props.formikData.values[props.name]}
            />
            <p>
                {props.formikData.errors[props.name]}
            </p>
        </div>
        
    )
}


export default TextInput