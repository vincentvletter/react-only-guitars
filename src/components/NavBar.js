import "./NavBar.css";
import React from "react";
import {NavLink} from "react-router-dom";


function NavBar({children}) {

    return (
        <header className="outerbox">
            <div className="innerbox">
                <nav>
                    <ul>
                        <NavLink to="/overview" exact className="nav-link" activeClassName="active-link">
                            <li>overzicht</li>
                        </NavLink>
                        <NavLink to="/profile" exact activeClassName="active-link">
                        <li>profiel</li>
                        </NavLink>
                    </ul>
                </nav>
                <div className="content">
                    {children}
                </div>
            </div>
        </header>
    )
}

export default NavBar;