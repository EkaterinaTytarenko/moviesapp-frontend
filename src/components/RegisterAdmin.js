import React from 'react'
import ReactDOM from "react-dom";
import RegisterComponent from "./RegisterComponent";

class RegisterAdmin extends React.Component {

    redirectToRegisterAdmin=(event)=>{
        event.preventDefault();
        var container=document.getElementById('main-content');
        ReactDOM.render(<RegisterComponent role="ADMIN"/>, container);
    }

    render() {
        return (
            <button
                className="btn btn-outline-danger btn-block"
                onClick={this.redirectToRegisterAdmin}>
                <span>Register new admin</span>
            </button>
        );
    }

}

export default RegisterAdmin;