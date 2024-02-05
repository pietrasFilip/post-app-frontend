import React from "react";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes
} from "react-router-dom";
import AddClient from "./client/AddClient";
import Error from "./error/Error";
import Clients from "./client/Clients";
import Monitor from "./monitor/Monitor";

const MainComponent = () => {
    return(
        <Router>
            <div className="my-2-mx">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/queue">Queue</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/queue/monitor">Monitor</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<AddClient/>}/>
                    <Route path="/queue" element={<Clients />} />
                    <Route path="/queue/monitor" element={<Monitor />} />
                    <Route path="/errors/:message/:status" element={<Error />}/>
                </Routes>
            </div>
        </Router>
    )
}

export default MainComponent;