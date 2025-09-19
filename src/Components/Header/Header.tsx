import React  from "react";
import {Link} from "react-router-dom"
import { useAuth } from "../../auth/AuthContext"

export default function Header(){

    const {user, logout} = useAuth();

    return(
        <header>
          <nav>
            <Link to="/">Landing</Link>
            <Link to="/home">Home</Link>
            <Link to="/jobs/new">Add Job</Link>

            <div className="nav-spacer">
                {user? (
                    <>
                        <span style={{marginRight: 8}}>Welcome {user.username}</span>
                            <button className="btn secondary" onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                    <Link to="/login">Login</Link> { " | " }
                    <Link to="/register">Register</Link>
                    </>
                )}
            </div>
            </nav>
        </header>
    )
}
