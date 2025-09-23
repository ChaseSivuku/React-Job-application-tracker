import React from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function Modal({ isOpen, title, message, onConfirm, onCancel }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
    >
      <div
        className={styles.container}
      >
        {title && <h3 style={{ marginBottom: "12px", color: "black" }}>{title}</h3>}
        <p style={{ marginBottom: "20px", color: "#333" }}>{message}</p>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
          <button
            onClick={onCancel}
            className={styles.cancelButton}
            onMouseOver={(e) => (e.currentTarget.style.background = "#f5f5f5")}
            onMouseOut={(e) => (e.currentTarget.style.background = "white")}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={styles.confirmButton}
            onMouseOver={(e) => (e.currentTarget.style.background = "#862222ff")}
            onMouseOut={(e) => (e.currentTarget.style.background = " #e62222")}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
