import React from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/AuthService";
import ReactDOM from "react-dom";
import RegisterComponent from "./RegisterComponent";
import UserLinks from "./UserLinks";
import RegisterAdmin from "./RegisterAdmin";
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

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user:"",
            username: "",
            password: "",
            isVerified: false
        };
    }

    componentDidMount() {
        this.setState({user:this.props.user});
        setInterval(() => {
            this.setState({user:AuthService.getCurrentUser()});
        }, 1000);
    }

    handleLogin=(event)=> {
        event.preventDefault();
        this.form.validateAll();

        event.target.disabled=true;
        AuthService.login(this.state.username, this.state.password).then(
            (response) => {
                let message="Login success!";

                if(response.status!=200)
                    message="Incorrect login or password. Please,Try again."

                var container=document.getElementById("main-content");

                ReactDOM.render(<h4>{message}</h4>,container);
            });
    }

    onChangeUsername=(event)=>{
        event.preventDefault();
        this.setState({
            username: event.target.value
        });
    }

    onChangePassword=(event)=>{
        event.preventDefault();
        this.setState({
            password: event.target.value
        });
    }

    redirectToRegister=(event)=>{
        event.preventDefault();
        var container=document.getElementById('main-content');
        ReactDOM.render(<RegisterComponent role="USER"/>, container);
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
                            <label htmlFor="username"><h4>Username or email</h4></label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                validations={[required]}
                                onChange={this.onChangeUsername}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password"><h4>Password</h4></label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                validations={[required]}
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
                                 onClick={this.handleLogin}
                                disabled={!this.state.isVerified}>
                                <span>Log in</span>
                            </button>
                        </div>

                        <button
                            className="btn btn-outline-primary btn-block"
                            onClick={this.redirectToRegister}>
                            <span>Register</span>
                        </button>

                        {
                            this.state.user!=null&&this.state.user.userRole=="ADMIN"&&<RegisterAdmin/>
                        }

                    </Form>
                </div>
        );
    }


}

export default LoginComponent