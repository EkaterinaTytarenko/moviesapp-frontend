import React from 'react'
import AuthService from "../services/AuthService";
import ReactDOM from "react-dom";
import LoginComponent from "./LoginComponent";
import Form from "react-validation/build/form";
import UserService from "../services/UserService";
import Recaptcha from "react-recaptcha";


class RequestComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            request:"",
            isVerified: false
        };
    }

    componentDidMount() {
        if(AuthService.getCurrentUser()==null) {
            this.redirectToLogin();
        }
    }

    redirectToLogin=()=>{
        const container = document.getElementById('main-content');
        ReactDOM.render(<LoginComponent/>, container);
    }

    requestChanged=(event)=>{
        event.preventDefault();
        this.setState({
            request: event.target.value
        });
    }

    captchaVerified=()=>{
        this.setState({isVerified:true});
    }

    makeRequest=(event)=>{
        event.preventDefault();
        if(AuthService.getCurrentUser()==null){
            this.redirectToLogin();
        }
        if(this.state.request!="") {
            event.target.disabled=true;
            UserService.userRequest(this.state.request).then(
                (response) => {
                    let message = "";

                    if (response.status != 200)
                        message = "System error.Please, try to send a request later"
                    else
                        message = response.data;

                    var container = document.getElementById("main-content");

                    ReactDOM.render(<h4>{message}</h4>, container);
                });
        }
    }


    render() {
        return (
            <div className="card card-container ml-lg-5 mr-lg-5">

                <Form className="p-4"
                      ref={c => {
                          this.form = c;
                      }}>

                    <div className="form-group">
                        <label htmlFor="request"><h5>Write your request bellow. We would be grateful if you could specify as much
                            as possible(for example,add links to the movies)</h5></label>
                        <textarea
                            id="request"
                            className="form-control pb-5"
                            onChange={this.requestChanged}
                            name="request"/>

                    </div>

                    <Recaptcha
                        sitekey="6Ld_GA8aAAAAAHzrWI7B5P4o8KlO16AXBhiefe7L"
                        render="explicit"
                        verifyCallback={this.captchaVerified}
                    />

                        <div className="form-group mt-3">
                            <button
                                className="btn-lg btn-outline-primary btn-block"
                                onClick={this.makeRequest}
                                disabled={!this.state.isVerified}>
                                <span>Submit your request</span>
                            </button>
                        </div>

                </Form>
            </div>

        );

        }

}

export default RequestComponent