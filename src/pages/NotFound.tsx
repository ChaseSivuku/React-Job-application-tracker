import React from "react";
import { Link } from "react-router-dom";

export default function () {
  return (
    <>
      <main style={{ padding: 20 }}>
        <h1>Oops!!!</h1>
        <p>Seems like you are lost.</p>
        <p>Sorry. the page you requested does not exist</p>
        <Link to="/">Back To Landing</Link>
      </main>
    </>
  );
}
