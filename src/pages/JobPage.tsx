import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJob, updateJob} from "../api/api";
import type { Job } from "../types";

export default function JobPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Job>>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getJob(Number(id));
        setJob(data);
        setFormData({
          company: data.company,
          role: data.role,
          status: data.status,
          details: data.details,
        });
      } catch {
        navigate("/not-found");
      }
    })();
  }, [id]);

  if (!job) return <p>Loading...</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Partial<Job>) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!id) return;
    try {
      const updated = await updateJob(Number(id), formData);
      setJob(updated);
      setEditing(false);
    } catch (err) {
      console.error("Failed to update job:", err);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      {!editing ? (
        <>
          <h2>{job.company} — {job.role}</h2>
          <p><strong>Status:</strong> {job.status}</p>
          <p><strong>Date applied:</strong> {job.dateApplied}</p>
          <p><strong>Details:</strong> {job.details}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      ) : (
        <>
          <h2>Edit Job</h2>
          <input
            name="company"
            value={formData.company || ""}
            onChange={handleChange}
            placeholder="Company"
          />
          <input
            name="role"
            value={formData.role || ""}
            onChange={handleChange}
            placeholder="Role"
          />
          <select name="status" value={formData.status || "Applied"} onChange={handleChange}>
            <option>Applied</option>
            <option>Interviewed</option>
            <option>Rejected</option>
          </select>
          <textarea
            name="details"
            value={formData.details || ""}
            onChange={handleChange}
            placeholder="Job details"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      )}
    </div>
  );
}
