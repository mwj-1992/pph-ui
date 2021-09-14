import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {RickList} from "./RickList";
import Summary from "./Summary";

const App = () => {

  return <Router>
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="https://www.linkedin.com/in/mwjprog/" target="_blank">
          MHD WAEL
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            
            <li className="nav-item active">
              <Link className="nav-link" to="/list">
                Rick & Morty <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/summary">
                Summary <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route path="/list">
          <RickList />
        </Route>
        <Route path="/summary">
          <Summary />
        </Route>
      </Switch>
    </div>
  </Router>
}
export default App;
