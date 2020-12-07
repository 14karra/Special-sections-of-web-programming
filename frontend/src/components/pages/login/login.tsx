import React from 'react'
import {Helmet} from 'react-helmet';
import {DefaultNavbar} from "../../navbars/defaultNavbar";
import LoginBox from "./loginBox";
import '../../../styles/loginPage.css';

export const Login: React.FunctionComponent = () => (
    <div id="loginPageContainer">
        <Helmet>
            <title>Login | Authorization Service</title>
        </Helmet>
        <DefaultNavbar/>
        <LoginBox />
    </div>
);