import React, {Component, } from "react";

class AlertMessage extends Component<{ msg: string, classStyle: string }> {
    render() {
        let {msg} = this.props;
        return (
            <div className={"alert "+ this.props.classStyle} role="alert">
                {msg}
            </div>
        );
    }
}

export default AlertMessage;