import "./NavBar.css";
import React from "react";


function NavBar({children}) {

    return(
        <header className="outerbox">
            <div className="innerbox">
                <nav>
                    <ul>
                        <li>overview</li>
                        <li>profile</li>
                        <li>edit</li>
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