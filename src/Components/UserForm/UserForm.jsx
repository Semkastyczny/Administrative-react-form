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
import CheckboxInput from "../Inputs/CheckboxInput";

function UserForm(props) {

    // could be fetched by API, arguably even should, if there's time, remake it as fetch
    const positionOptions = [
        {value: 1, label: "Tester"},
        {value: 2, label: "Developer"},
        {value: 3, label: "Project Manager"}
    ]

    const messageRef = useRef();

    const [position, setPosition] = useState(0);

    function validateForm (values) {
        const errors = {}

        if (!values.email) {
            errors.email = "Brak adresu email!";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
            errors.email = "Niepoprawny adres email"
        }

        if (!values.firstName) {
            errors.firstName = "Brak podanego imienia!";
        }

        if (!values.lastName) {
            errors.lastName = "Brak podanego nazwiska!";
        }


        if (Object.keys(errors).length > 0 ) {
            messageRef.current.innerText = errors[Object.keys(errors)[0]];
            messageRef.current.classList.add("show")
        } else {
            messageRef.current.innerText = null;
            messageRef.current.classList.remove("show")
        }

        return errors;

    } 

    const handlePositionChange = (e) => {
        setPosition(e.value)
    }

    // const handleCheckbox = (e) => {
    //     userForm.setValues({e.name: e.value})
    // }


    const userForm = useFormik({
        initialValues: {
            'email' : "",
            'firstName' : "",
            'lastName' : "",
            'description' : "",
            'idPosition' : 1,
            'testingSystems':"",
            'raportingSystems':"",
            'selenium':false,
            'ideEnvironments':"",
            'programmingLanguages':"",
            'mysql':false,
            'methodologies':"",
            'scrum':false
        },
        validateOnChange: false,
        validate: validateForm,
        onSubmit: (values, actions) => {
            const formData = new FormData();
            formData.append("email", values.email)
            formData.append("firstName", values.firstName)
            formData.append("lastName", values.lastName)
            formData.append("description", values.description)
            formData.append("idPosition", position)
            formData.append("testingSystems", values.testingSystems)
            formData.append("raportingSystems", values.raportingSystems)
            formData.append("selenium", values.selenium)
            formData.append("ideEnvironments", values.ideEnvironments)
            formData.append("programmingLanguages", values.programmingLanguages)
            formData.append("mysql", values.mysql)
            formData.append("methodologies", values.methodologies)
            formData.append("scrum", values.scrum)

            setTimeout(() => {
                fetch(apiUrls.base + apiUrls.register, {
                    method: 'POST',
                    body: formData
                })
                .then((res) => res.json())
                .then((json) => {
                    if (json.statusCode === 200) 
                        messageRef.current.innerText = "Wysłaliśmy wiadomość z dostępami na twoją skrzynkę";
                    else 
                        messageRef.current.innerText = json.errror
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
                        name = {"email"}
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
                    <label className={"text-center"}>Stanowisko</label>
                    <Dropdown 
                        controlClassName={`${styles.dropdownInput} ${styles.dropdownOverride}`} 
                        placeholderClassName={styles.dropdownPlaceholderOverride}
                        arrowClassName={styles.dropdownArrowOverride}
                        menuClassName={styles.dropdownMenuOverride}
                        className={"d-flex align-items-center flex-column px-2"}
                        options={positionOptions}
                        onChange={handlePositionChange}
                    />
                    { position == 1 ? (
                        <div>
                            <TextInput
                                text = {"Systemy testujące"}
                                type = {"text"}
                                name = {"testingSystems"}
                                className = {styles.formInput}
                                formikData = {userForm}
                            />
                            <TextInput
                                text = {"Systemy Raportowe"}
                                type = {"text"}
                                name = {"raportingSystems"}
                                className = {styles.formInput}
                                formikData = {userForm}
                            />
                            <CheckboxInput
                                text = {"Selenium"}
                                name = {"selenium"}
                                onClick={() => userForm.handleChange}
                            />
                        </div>
                    ) : null}
                    { position == 2 ? (
                        <div>
                            <TextInput
                                text = {"Środowiska IDE"}
                                type = {"text"}
                                name = {"ideEnvironments"}
                                className = {styles.formInput}
                                formikData = {userForm}
                            />
                            <TextInput
                                text = {"Języki programowania"}
                                type = {"text"}
                                name = {"programmingLanguages"}
                                className = {styles.formInput}
                                formikData = {userForm}
                            />
                            <CheckboxInput
                                text = {"Zna Mysql"}
                                name = {"methodologies"}
                                onClick={() => userForm.handleChange}
                            />
                        </div>
                    ) : null}
                    { position == 3 ? (
                        <div>
                            <TextInput
                                text = {"Metodologie prowadzenia projektów"}
                                type = {"text"}
                                name = {"methodologies"}
                                className = {styles.formInput}
                                formikData = {userForm}
                            />
                            <TextInput
                                text = {"Systemy Raportowe"}
                                type = {"text"}
                                name = {"raportingSystems"}
                                className = {styles.formInput}
                                formikData = {userForm}
                            />
                            <CheckboxInput
                                text = {"Zna Scrum"}
                                name = {"scrum"}
                                onClick={() => userForm.handleChange}
                            />
                        </div>
                    ) : null}
                    <div className={"submit d-flex align-items-center flex-column"}>
                        <Button 
                            styles = {"countButton"}
                            type = "submit"
                            img = "https://img.icons8.com/dotty/80/submit-for-approval.png"
                        />
                        <p ref={messageRef}></p>
                    </div>
                </div>
            </form>
        </div>
    )
}




export default UserForm;