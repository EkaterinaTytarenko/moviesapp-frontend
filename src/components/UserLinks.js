import React from 'react'
import ReactDOM from "react-dom";
import RequestComponent from "./RequestComponent";

class UserLinks extends React.Component {

    requestPage=(event)=>{
        event.preventDefault();
        const container = document.getElementById('main-content');
        ReactDOM.render(<RequestComponent/>, container);
    }

    render() {
        return (
            <li className="nav-item">
                <a className="nav-link" href="#" onClick={this.requestPage}>Request new category or movie</a>
            </li>
        );
    }

}

export default UserLinks;