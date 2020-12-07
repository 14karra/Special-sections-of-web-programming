import React, {useState} from 'react'
import {Helmet} from 'react-helmet';
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import styles from "./Register.module.css";
import {Properties} from "../../commons/properties";

const RegisterBox = () => {
    const {register, handleSubmit, errors} = useForm();
    const [message, setMessage] = useState({data: '', type: ''});

    const onSubmit = (data: any, e: any) => {
        let respStatus: number;
        const newMessageObj = {
            data: "Registration is in progress...",
            type: "alert-warning"
        };
        setMessage(newMessageObj);

        fetch(Properties.AUTH_URL, {
            method: "POST",
            body: JSON.stringify(data),
        }).then(resp => {
            console.log("res.statusText " + resp.statusText);
            respStatus = resp.status.valueOf();
            let hasError = undefined;
            let errorDetails: string = "";
            switch (respStatus) {
                case 200:
                    hasError = false;
                    break;
                case 409:
                    hasError = true;
                    errorDetails = "This account already exist. Please use other credentials.";
                    break;
                case 500:
                    console.log('server error, try again');
                    hasError = true;
                    errorDetails = "An internal server error occurred. Please try again later";
                    break;
                default:
                    console.log('unhandled status');
                    break
            }
            console.log('Response status was: ' + respStatus);

            setMessage({
                data: hasError ? errorDetails : "Registered successfully",
                type: hasError ? "alert-danger" : "alert-success",
            });

            !hasError && e.target.reset();

        }).catch(err => {
            console.error(err)
        });
    };

    return (
        <div className={`${styles.container} container-fluid d-flex align-items-center justify-content-center`}>
            <Helmet>
                <title>Register | Authorization Service</title>
            </Helmet>
            <div className={styles.registrationFormContainer}>
                {(message.data.length > 0) &&
                (<div className={`alert fade show d-flex ${message.type}`} role="alert">
                    {message.data}
                    <span aria-hidden="true" className="ml-auto cursor-pointer"
                          onClick={() => setMessage({data:'', type: ''})}>
                        &times;
                    </span>
                </div>)
                }
                <fieldset className={`${styles.registrationFormFieldset} border p-3 rounded`}>
                    <legend className={`${styles.registrationFormLegend} border rounded p-1 text-center`}>
                        Registration Form
                    </legend>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="inputForUsername">Username: </label>
                            <input
                                id="inputForUsername"
                                name="username"
                                type="text"
                                className="form-control"
                                aria-describedby="Enter your username"
                                placeholder="Enter your username"
                                ref={register({
                                    required: {
                                        value: true,
                                        message: "Please enter your username",
                                    },
                                    minLength: {
                                        value: 4,
                                        message: "Minimum 4 characters are allowed",
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "Maximum 100 characters are allowed",
                                    },
                                })}
                            />
                            {errors.username && (
                                <span className={`${styles.errorMessage} mandatory`}>
                                    {errors.username.message}
                                </span>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputForPassword">Password: </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="inputForPassword"
                                placeholder="Enter password"
                                ref={register({
                                    required: {
                                        value: true,
                                        message: "Please enter password",
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Minimum 8 characters are allowed",
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "Maximum 100 characters are allowed",
                                    },
                                })}
                            />
                            {errors.password && (
                                <span className={`${styles.errorMessage} mandatory`}>
                                    {errors.password.message}
                                </span>)
                            }
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <button type="submit" className="btn btn-outline-primary">
                                Submit
                            </button>
                            <button className="btn btn-link">
                                <Link to="/login">Cancel</Link>
                            </button>
                        </div>
                    </form>
                </fieldset>
            </div>
        </div>
    );
};

export default RegisterBox;