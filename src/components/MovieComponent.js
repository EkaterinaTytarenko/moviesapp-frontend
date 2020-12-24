import React from 'react'
import ReactDOM from "react-dom";
import LoginComponent from "./LoginComponent";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import DeleteButton from "./DeleteButton";


function AppendRatings(props) {
    const movie = props.movie;
    let items;
    if (movie != undefined) {
        const ratings = movie.common_ratings;
        if (ratings != undefined) {
            items = ratings.map((rating) =>
                <div className="row mt-4" key={rating.id}>
                    <div style={{width: "67%"}}>
                        <span className="input-group-text">{rating.category_name}</span>
                    </div>
                    <div className="btn-group">
                        <button type="button" id={"button-negative" + rating.id} className="btn btn-outline-danger"
                                value={rating.rating}
                                onClick={(event) => rate(event, rating, -1, movie.id)}>Yes
                            <span id={"rating-negative" + rating.id}
                                  className="badge badge-light">{rating.rating < 0 ? -rating.rating : 0}</span>
                        </button>
                        <button type="button" id={"button-positive" + rating.id} className="btn btn-outline-success"
                                value={rating.rating}
                                onClick={(event) => rate(event, rating, 1, movie.id)}>No
                            <span id={"rating-positive" + rating.id}
                                  className="badge badge-light">{rating.rating > 0 ? rating.rating : 0}</span>
                        </button>
                    </div>
                </div>
            );
        }

    }
    return (
        <>{items}</>
    );

}

function rate(event, commonRating, newRating, movie_id) {
    event.preventDefault();

    let user = AuthService.getCurrentUser();
    if (user == null) {
        redirectToLogin();
        return;
    }

    let userRatings = user.userRatings;
    let oldRating;
    for (let i = 0; i < userRatings.length; ++i) {
        if (userRatings[i].category_id == commonRating.id && userRatings[i].movie_id == movie_id) {
            oldRating = (Number)(userRatings[i].rating);

            if (oldRating == newRating)
                return;

            user.userRatings[i].rating = newRating;

            localStorage.setItem("user", JSON.stringify(user));
            break;
        }
    }

    let totalRating = (Number)(event.target.value);

    if (isNaN(totalRating)) {
        totalRating = (Number)(event.target.parentElement.value);
    }

    if (oldRating == -newRating) {
        totalRating += 2 * newRating;
    } else {
        totalRating += newRating;
    }

    UserService.changeRating(user.userId, commonRating.id, movie_id, newRating, totalRating);

    document.getElementById("button-negative" + commonRating.id).value = totalRating;
    document.getElementById("button-positive" + commonRating.id).value = totalRating;


    document.getElementById("rating-negative" + commonRating.id).innerHTML = (String)(totalRating < 0 ? -totalRating : 0);
    document.getElementById("rating-positive" + commonRating.id).innerHTML = (String)(totalRating > 0 ? totalRating : 0);
}


function redirectToLogin() {
    const container = document.getElementById('main-content');
    ReactDOM.render(<LoginComponent/>, container);
}

class MovieComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            movie: {},
            user: {}

        }
    }

    componentDidMount() {
        this.setState({
            movie: this.props.movie
        });
        setInterval(() => {
            this.setState({user: AuthService.getCurrentUser()});
        }, 1000);
    }


    render() {
        return (
            <div className="row">
                <div className="col-6">

                    <h2>{this.state.movie.title + ", "}{this.state.movie.year}</h2>
                    <h6>{this.state.movie.genres}</h6>
                    <img className="img-thumbnail" style={{"maxHeight": "700px"}} src={this.state.movie.picture_url}
                         alt=""/>
                </div>
                <div className="col-6" style={{marginTop: "9%"}}>
                    <AppendRatings movie={this.state.movie}/>
                    {
                        this.state.user != null && this.state.user.userRole == "ADMIN" && <DeleteButton movie={this.state.movie}/>
                    }
                </div>
            </div>

        )
    }
}

export default MovieComponent