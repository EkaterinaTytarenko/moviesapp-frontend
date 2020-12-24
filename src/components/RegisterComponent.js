import React from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/AuthService";
import ReactDOM from "react-dom";
import { isEmail } from "validator";
import Recaptcha from "react-recaptcha";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

class RegisterComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            role:"",
            username: "",
            email:"",
            password: "",
            isVerified: false
        };
    }

    componentDidMount() {
        this.setState({role:this.props.role});
    }

    register=(event)=> {
        event.preventDefault();
        this.form.validateAll();

        event.target.disabled=true;
        AuthService.register( this.state.username, this.state.email, this.state.password,this.state.role).then(
            (response) => {
                var container=document.getElementById("main-content");
                ReactDOM.render(<h4>{response.data}</h4>,container);
            });
    }

    onChangeUsername=(event)=>{
        event.preventDefault();
        this.setState({
            username: event.target.value
        });
    }

    onChangeEmail=(event)=>{
        event.preventDefault();
        this.setState({
            email: event.target.value
        });
    }

    onChangePassword=(event)=>{
        event.preventDefault();
        this.setState({
            password: event.target.value
        });
    }

    captchaVerified=()=>{
        this.setState({isVerified:true});
    }

    render() {
        return (
            <div className="card card-container ml-lg-5 mr-lg-5">

                <Form className="p-4"
                      ref={c => {
                          this.form = c;
                      }}>
                    <div className="form-group">
                        <label htmlFor="username"><h4>Username</h4></label>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            validations={[required,vusername]}
                            onChange={this.onChangeUsername}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username"><h4>Email</h4></label>
                        <Input
                            type="text"
                            className="form-control"
                            name="email"
                            validations={[required,email]}
                            onChange={this.onChangeEmail}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password"><h4>Password</h4></label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            validations={[required,vpassword]}
                            onChange={this.onChangePassword}
                        />
                    </div>

                    <Recaptcha
                        sitekey="6Ld_GA8aAAAAAHzrWI7B5P4o8KlO16AXBhiefe7L"
                        render="explicit"
                        verifyCallback={this.captchaVerified}
                    />

                    <div className="form-group mt-3">
                        <button
                            className="btn-lg btn-primary btn-block"
                            onClick={this.register}
                            disabled={!this.state.isVerified}>
                            <span>Create an account</span>
                        </button>
                    </div>

                </Form>
            </div>
        );
    }


}

export default RegisterComponent