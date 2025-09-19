import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../api/api";
import { useAuth } from "../auth/AuthContext";

export default function AddJob() {
  const { user } = useAuth();
  const navigate = useNavigate();
  type StatusType = "Applied" | "Interviewed" | "Rejected";
  const [formData, setFormData] = useState<{
    company: string;
    role: string;
    status: StatusType;
    details: string;
  }>({
    company: "",
    role: "",
    status: "Applied",
    details: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    await createJob({
      ...formData,
      userId: user.id,
      dateApplied: new Date().toISOString(),
    });
    navigate("/home");
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Add Job</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxWidth: 400,
        }}
      >
        <input
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />
        <input
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Applied</option>
          <option>Interviewed</option>
          <option>Rejected</option>
        </select>
        <textarea
          name="details"
          placeholder="Details"
          value={formData.details}
          onChange={handleChange}
        />
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}
