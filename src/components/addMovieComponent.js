import React from 'react'
import AuthService from "../services/AuthService";
import ReactDOM from "react-dom";
import LoginComponent from "./LoginComponent";
import UserService from "../services/UserService";

function AppendMovies(props) {
    const movies = props.movies;
    const listItems = movies.map((movie) =>
        <div className="col-md-4 col-sm-6 mt-4">
            <h6>{movie.Title+", "}{movie.Year}</h6>
            <img className="img-thumbnail" style={{"maxHeight":"190px"}} src={movie.Poster} alt=""/>
            <button
                className="btn btn-outline-secondary d-block pl-5 pr-5 mt-2"
                value={movie.imdbID}
                onClick={addMovie}>
                <span>Add this</span>
            </button>
        </div>
    );
    return (
        <div className="row mt-2">{listItems}</div>
    );
}

function addMovie(event){
    event.preventDefault();

    event.target.disabled=true;
    UserService.addMovie(event.target.value).then(
        (response) => {
            let message = "";

            if (response.status != 200)
                message = "System error.Please, try to add this movie later"
            else
                message = response.data;

            var container = document.getElementById("main-content");

            ReactDOM.render(<h4>{message}</h4>, container);
            setTimeout(reloadPage, 1800);
        });
}

function reloadPage(){
    window.location.reload(false);
}

class AddMovieComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            message: "",
            movies: []
        };
    }

    searchMovies = (event) => {
        event.preventDefault();
        if (AuthService.getCurrentUser() == null) {
            this.redirectToLogin();
        }
        UserService.find_new_movies(this.state.title).then(response => {
            if(response.data.Search) {
                this.setState({
                    message:"",
                    movies: response.data.Search});
            }
            else {
                this.setState({
                    message: "Nothing was found. Please, try to search again.",
                    movies:[]
                });
            }
        })
    }

    redirectToLogin = () => {
        const container = document.getElementById('main-content');
        ReactDOM.render(<LoginComponent/>, container);
    }

    onTitleChange = (event) => {
        this.setState({
            title: event.target.value
        });
    }


    render() {
        return (
            <div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter the movie`s title"
                           onChange={this.onTitleChange} aria-label="Enter the movie`s title"
                           aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.searchMovies}>Search
                        </button>
                    </div>
                </div>

                <h4>{this.state.message}</h4>

                <div>
                   <AppendMovies movies={this.state.movies}/>
                </div>

            </div>


        );
    }
}

export default AddMovieComponent

