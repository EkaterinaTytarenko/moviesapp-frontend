import React from 'react'
import Form from "react-validation/build/form";
import AuthService from "../services/AuthService";
import ReactDOM from "react-dom";
import LoginComponent from "./LoginComponent";
import UserService from "../services/UserService";

class DeleteButton extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            movie: {}

        }
    }

    componentDidMount() {
        this.setState({
            movie: this.props.movie
        });
    }

    deleteMovie=(event)=>{
        event.preventDefault();
        let user = AuthService.getCurrentUser();
        if (user == null||user.userRole!="ADMIN") {
            this.redirectToLogin();
        }

        event.target.disabled=true;
        UserService.deleteMovie(this.state.movie.id).then(
            (response) => {
                let message = "";

                if (response.status != 200)
                    message = "System error.Please, try to delete this movie later"
                else
                    message = response.data;

                var container = document.getElementById("main-content");

                ReactDOM.render(<h4>{message}</h4>, container);
                setTimeout(this.reloadPage, 1800);
            });
    }

    reloadPage=()=>{
        window.location.reload(false);
    }

    redirectToLogin=()=>{
        const container = document.getElementById('main-content');
        ReactDOM.render(<LoginComponent/>, container);
    }

    render() {
        return (
            <button className="btn btn-danger mt-4 row"
            onClick={this.deleteMovie}>
                <span>Delete this movie</span>
            </button>
        );
    }

}

export default DeleteButton