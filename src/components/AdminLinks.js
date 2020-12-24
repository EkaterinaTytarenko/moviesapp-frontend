import React from 'react'
import ReactDOM from "react-dom";
import AddCategoryComponent from "./AddCategoryComponent";
import AddMovieComponent from "./addMovieComponent";

class AdminLinks extends React.Component {

    addCategoryPage=(event)=>{
        event.preventDefault();
        const container = document.getElementById('main-content');
        ReactDOM.render(<AddCategoryComponent/>, container);
    }

    addMoviePage=(event)=>{
        event.preventDefault();
        const container = document.getElementById('main-content');
        ReactDOM.render(<AddMovieComponent/>, container);
    }

    render() {
        return (
            <>
            <li className="nav-item">
                <a className="nav-link" href="#" onClick={this.addCategoryPage}>Add new category</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#" onClick={this.addMoviePage}>Add new movie</a>
            </li>
            </>
        );
    }

}

export default AdminLinks;