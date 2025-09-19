import React from "react";
import { Link } from "react-router-dom";

export default function() {
    return(
        <main style={{padding: 20}}>
            <h1>Job Applications Tracker</h1>
            <p>
                Track your job applications
            </p>
            <p>
                <Link to="/register">Create an account</Link> or <Link to="/login">Login</Link> to get started
            </p>
        </main>
    )
}