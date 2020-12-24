import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import UserService from "../services/UserService";
import MovieComponent from "./MovieComponent";
import ReactDOM from "react-dom";
import LoginComponent from "./LoginComponent";
import AuthService from "../services/AuthService";
import UserLinks from "./UserLinks";
import AdminLinks from "./AdminLinks";


class MainPageComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            movies:[],
            user:""
        }
    }

    componentDidMount() {
        UserService.getAllMovies().then((response) => {
            this.setState({movies: Array.from(response.data)})
        });
        setInterval(() => {
            this.setState({user:AuthService.getCurrentUser()});
        }, 1000);
    }

    loadMovieInfo = (event, newValue) => {
        event.preventDefault();
        if (newValue != null) {
            const container = document.getElementById('main-content');
            ReactDOM.unmountComponentAtNode(container);
            UserService.getMovieDetails(newValue.id).then(response => {
                ReactDOM.render(<MovieComponent movie={response.data}/>, container);
            })
        }
    }

    clearAll=(event)=>{
        event.preventDefault();
        ReactDOM.unmountComponentAtNode(document.getElementById('main-content'));
        document.getElementById('combo-box-demo').value="";
    }

    redirectToLogin=(event)=>{
        event.preventDefault();
        const container = document.getElementById('main-content');
        ReactDOM.render(<LoginComponent user={this.state.user}/>, container);
    }


    logout=(event)=>{
        event.preventDefault();
        AuthService.logout();
        const container = document.getElementById('main-content');
        ReactDOM.render(<h4>You are now logged out</h4>, container);
    }

    render() {
        return (
            <div id="page" className="mb-5">
                <div className="jumbotron text-center mb-0">
                    <h2>The sample clone of <a href="https://www.doesthedogdie.com/">doesthedogdie.com</a></h2>
                    <div className="d-flex justify-content-center">
                        <Autocomplete
                            id="combo-box-movies"
                            options={this.state.movies}
                            getOptionLabel={(option) => option.title + ", " + option.year}
                            style={{width: 400}}
                            renderInput={(params) => <TextField {...params}
                                                                variant="outlined"/>}
                            onChange={this.loadMovieInfo}
                        />
                    </div>
                </div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <a className="navbar-brand" href="#" onClick={this.redirectToLogin}>Log in</a>
                    <div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={this.clearAll}>Clear all</a>
                            </li>
                            {
                                (this.state.user==null||this.state.user.userRole=="USER")&&<UserLinks/>
                            }
                            {
                                this.state.user!=null&&this.state.user.userRole=="ADMIN"&&<AdminLinks/>
                            }
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={this.logout}>Log out</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div id="main-content" className="container" style={{marginTop:"3.5%"}}/>
            </div>

        )
    }

}

export default MainPageComponent