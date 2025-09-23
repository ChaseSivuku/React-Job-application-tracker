import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import Modal from "../Modal/Modal"; 

export default function Header() {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleConfirmLogout = () => {
    logout(); 
    setShowModal(false);
  };

  const handleCancelLogout = () => {
    setShowModal(false);
  };

  return (
    <header>
      <nav>
        <Link to="/home" style={{display:"flex", alignItems: "center", gap: "5px"}}><img src="home.png" alt="" />Home</Link>
        <Link to="/jobs/new"> + Add Job</Link>

        <div className="nav-spacer">
          {user ? (
            <>
              <span style={{ marginRight: 8 }}>Welcome {user.username}</span>
              <button className="btn secondary" onClick={handleLogoutClick}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link> {" | "}
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <Modal
        isOpen={showModal}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </header>
  );
}
