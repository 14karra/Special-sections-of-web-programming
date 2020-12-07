import React, {Component} from 'react'
import {LogoutOption} from "./options/logoutOption";

export class DashboardNavbar extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar topnav navbar-expand-sm bg-dark navbar-dark">
                    <div className="navbar-nav ml-auto">
                        <LogoutOption/>
                    </div>
                </nav>
            </div>
        )
    }
}