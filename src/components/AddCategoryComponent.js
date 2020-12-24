import React from 'react'
import AuthService from "../services/AuthService";
import ReactDOM from "react-dom";
import LoginComponent from "./LoginComponent";
import Form from "react-validation/build/form";
import UserService from "../services/UserService";
import Recaptcha from "react-recaptcha";


class AddCategoryComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            category_name: "",
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

    inputChanged=(event)=>{
        event.preventDefault();
        this.setState({
            category_name: event.target.value
        });
    }

    captchaVerified=()=>{
        this.setState({isVerified:true});
    }

    addCategory=(event)=>{
        event.preventDefault();
        if(AuthService.getCurrentUser()==null){
            this.redirectToLogin();
        }
        if(this.state.category_name!="") {
            event.target.disabled=true;
            UserService.addCategory(this.state.category_name).then(
                (response) => {
                    let message = "";

                    if (response.status != 200)
                        message = "System error.Please, try to add a new category later"
                    else
                        message = response.data;

                    var container = document.getElementById("main-content");

                    ReactDOM.render(<h4>{message}</h4>, container);
                    setTimeout(this.reloadPage, 1800);
                });
        }
    }

    reloadPage=()=>{
        window.location.reload(false);
    }


    render() {
        return (
            <div className="card card-container ml-lg-5 mr-lg-5">

                <Form className="p-4"
                      ref={c => {
                          this.form = c;
                      }}>

                    <div className="form-group">
                        <label htmlFor="category_name"><h5>Write the name for the new category below</h5></label>
                        <textarea
                            id="category_name"
                            className="form-control pb-5"
                            onChange={this.inputChanged}
                            name="category_name"
                        />
                    </div>

                    <Recaptcha
                        sitekey="6Ld_GA8aAAAAAHzrWI7B5P4o8KlO16AXBhiefe7L"
                        render="explicit"
                        verifyCallback={this.captchaVerified}
                    />

                    <div className="form-group mt-3">
                        <button
                            className="btn-lg btn-outline-primary btn-block"
                            onClick={this.addCategory}
                            disabled={!this.state.isVerified}>
                            <span>Add new category</span>
                        </button>
                    </div>

                </Form>
            </div>

        );

    }

}

export default AddCategoryComponent