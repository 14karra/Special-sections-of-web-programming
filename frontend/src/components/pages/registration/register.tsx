import React from 'react'
import {Helmet} from 'react-helmet';
import {DefaultNavbar} from "../../navbars/defaultNavbar";
import '../../../styles/loginPage.css';
import RegisterBox from "./registerBox";

export const Register: React.FunctionComponent = () => (
    <div id="loginPageContainer">
        <Helmet>
            <title>Register | Authorization Service</title>
        </Helmet>
        <DefaultNavbar/>
        <RegisterBox/>
    </div>
);