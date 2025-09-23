import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/Landing.module.css";

export default function () {
  return (
    <main style={{ padding: 20 }}>
      <div className={styles.headingContainer}>
        <div>
          <h1>Job Applications Tracker</h1>
          <p>Login or create an account to manage your job applications.</p>
        </div>
        <div>
          <img src="/add-job-icon.png" alt="" />
        </div>
      </div>
      <p>
        <Link to="/register">Create an account</Link> or{" "}
        <Link to="/login">Login</Link> to get started
      </p>
    </main>
  );
}
