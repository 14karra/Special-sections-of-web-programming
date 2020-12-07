import React from 'react'
import {BrowserRouter, Link, Route, withRouter} from "react-router-dom";
import {RouteComponentProps} from 'react-router';
import {Properties} from "../../commons/properties";
import "../../commons/properties";
import '../../../styles/loginBox.css'
import AlertMessage from "../../commons/AlertMessage";

interface MyProps {
    history: any
}

interface MyState {
    receivedNegativeResponse: boolean
}

export class LoginBox extends React.Component<MyProps & RouteComponentProps, MyState> {
    constructor(props: any) {
        super(props);

        this.state = {receivedNegativeResponse: false};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getFieldValue = this.getFieldValue.bind(this);
        this.fetchUserInDatabase = this.fetchUserInDatabase.bind(this);
    }

    handleSubmit = async (e: any) => {
        e.preventDefault();
        let username = this.getFieldValue("username");
        let password = this.getFieldValue("password");
        await this.fetchUserInDatabase(username, password);
    };

    getFieldValue = (fieldName: string) => {
        return (document.getElementById(fieldName) as HTMLInputElement).value
    };

    fetchUserInDatabase = async (username: string, password: string) => {
        let respStatus: number;
        await fetch(Properties.AUTH_URL + "?username=" + username + "&password=" + password, {
            method: 'GET'
        }).then(resp => {
            console.log("res.statusText " + resp.statusText);
            respStatus = resp.status.valueOf();
            switch (respStatus) {
                case 200:
                    this.setState({receivedNegativeResponse: false});
                    setTimeout(() => {
                        //localStorage.setItem("token", data.token);
                        this.props.history.push('/dashboard');
                    }, 1000);
                    break;
                case 404:
                    this.setState({receivedNegativeResponse: true});
                    break;
                case 500:
                    console.log('server error, try again');
                    break;
                default:
                    console.log('unhandled status');
                    break
            }
            console.log('Response status was: ' + respStatus);
        }).catch(err => {
            console.error(err)
        });
    };

    render() {
        return (
            <div className="container h-75">
                <div className="d-flex justify-content-center h-100">
                    <div className="user_card ">
                        <div className="d-flex justify-content-center form_container">
                            <form onSubmit={this.handleSubmit}>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-user"/></span>
                                    </div>
                                    <input type="text" id="username" name="username" className="form-control input_user"
                                           placeholder="username" required/>
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-key"/></span>
                                    </div>
                                    <input type="password" id="password" name="password"
                                           className="form-control input_pass"
                                           placeholder="password" required/>
                                </div>
                                <span>
                                    {this.state.receivedNegativeResponse &&
                                    <AlertMessage classStyle="alert-danger" msg="Incorrect login or password"/>}
                                </span>
                                <div className="d-flex justify-content-center mt-3 p-3 login_container">
                                    <button type="submit" className="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                                <div>Have no account?&nbsp;
                                    <Link to={'/register'}>create one.</Link>
                                </div>
                                <BrowserRouter>
                                    <Route path="/login/login-error" render={(props) =>
                                        <AlertMessage {...props} msg={`Incorrect username or password!`}
                                                      classStyle="alert-danger"/>}>
                                    </Route>
                                </BrowserRouter>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default withRouter(LoginBox);