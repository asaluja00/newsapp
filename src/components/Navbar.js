import React, { Component } from 'react'
import { Link } from "react-router-dom";
import logo from './images/logo.png'
export default class navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className='container-fluid'>
                    <Link className="navbar-brand " to="/">
                        <img src={logo} alt="Logo" className="d-inline-block align-text-top" width="30" height="24" />
                            NewsArc
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/Home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/technology">Technology</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/business">Business</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/entertainment">Entertainment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/health">Health</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/science">Science</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sports">Sports</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
