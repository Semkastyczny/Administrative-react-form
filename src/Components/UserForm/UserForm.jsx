'use client';

import { useFormik } from "formik";
import styles from "./form.module.css";
import { useState, useRef } from "react";
import TextInput from "../Inputs/TextInput";
import Button from "../Button/Button";
import TextareaInput from "../Inputs/TextareaInput";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { apiUrls } from "@/assets/api/apiUrls";

function UserForm(props) {

    const positionOptions = [
        {value: 1, label:"Tester"},
        {value: 2, label:"Developer"},
        {value: 3, label:"Project Manager"}
    ]
    const messageRef = useRef();

    const [value, setValue] = useState(0);

    function validateForm (values) {
        const errors = {}

        return errors;

    } 

    const userForm = useFormik({
        initialValues: {
            'email' : "",
            'firstName' : "",
            'lastName' : "",
            'description' : "",
            'idPosition' : "",
        },
        validateOnChange: false,
        validate: validateForm,
        onSubmit: (values, actions) => {
            const formData = new FormData();

            formData.append("email", values.email)
            formData.append("firstName", values.firstName)
            formData.append("lastName", values.lastName)
            formData.append("description", values.description)
            formData.append("idPosition", values.idPosition)

            setTimeout(() => {
                fetch(apiUrls.base + apiUrls.register, {
                    method: 'POST',
                    body: formData
                })
                .then((res) => res.json())
                .then((json) => {
                    if (!json.error) setValue(json.result)
                })
            }, 200)
        }
    })

    return (
        <div className="rounded">
            <form onSubmit={userForm.handleSubmit} className="form rounded">
                <div className={"d-flex flex-column bd-highlight mb-3 align-items-strech justify-content-center rounded-pill bg-success"}>
                    <TextInput
                        text = {"Adres email"}
                        type = {"text"}
                        name = {"email "}
                        className = {styles.formInput}
                        formikData = {userForm}
                    />
                    <TextInput
                        text = {"Imię"}
                        type = {"text"}
                        name = {"firstName"}
                        className = {styles.formInput}
                        formikData = {userForm}
                    />
                    <TextInput
                        text = {"Nazwisko"}
                        type = {"text"}
                        name = {"lastName"}
                        className = {styles.formInput}
                        formikData = {userForm}
                    />
                    <TextareaInput
                        name={"description"}
                        text={"Opis"}
                        className = {`${styles.formInput} ${styles.textarea}`}
                        formikData = {userForm}
                    />
                    <Dropdown 
                        controlClassName={`${styles.dropdownInput} ${styles.dropdownOverride}`} 
                        placeholderClassName={styles.dropdownPlaceholderOverride}
                        arrowClassName={styles.dropdownArrowOverride}
                        menuClassName={styles.dropdownMenuOverride}
                        className={"d-flex align-items-center flex-column px-2"}
                        options={positionOptions} 
                        value={1} 
                        placeholder="Wybierz stanowisko"
                    />
                    <div className={"submit d-flex align-items-center flex-column"}>
                        <Button 
                            styles = {"countButton"}
                            type = "submit"
                            img = "https://img.icons8.com/dotty/80/submit-for-approval.png"
                        />
                    </div>
                </div>
            </form>
            <p className={"errorMessage"} ref={messageRef}></p>
        </div>
    )
}




export default UserForm;