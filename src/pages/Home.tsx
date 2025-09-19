import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getJobs, deleteJob } from "../api/api";
import type { Job } from "../types";
import { useAuth } from "../auth/AuthContext";
import SearchBarFilter from "../Components/SearchFilterBar/SearchBarFilter";

export default function Home() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const status = searchParams.get("status") ?? "all";
  const sort = searchParams.get("sort") ?? "desc";
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        const params: any = { userId: user?.id };
        if (q) params.q = q;
        if (status && status !== "all") params.status = status;
        params._sort = "dateApplied";
        params._order = sort === "asc" ? "asc" : "desc";

        const data = await getJobs(params);
        setJobs(data);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [q, status, sort, user?.id]);

  const onSearch = (newQ: string) => {
    const next = new URLSearchParams(Object.fromEntries([...searchParams]));
    if (newQ) next.set("q", newQ);
    else next.delete("q");
    setSearchParams(next);
  };

  const onSort = (newSort: string) => {
    const next = new URLSearchParams(Object.fromEntries([...searchParams]));
    next.set("sort", newSort);
    setSearchParams(next);
  };

  const onDelete = async (id: number) => {
    if (confirm("Delete this job?")) {
      await deleteJob(id);
      setJobs((prev) => prev.filter((j) => j.id !== id));
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Your Jobs</h1>
      <SearchBarFilter q={q} status={status} sort={sort} onSearch={onSearch} onSort={onSort} />

      {loading ? <p>Loading...</p> : null}

      {jobs.map((job) => (
        <div key={job.id} style={{ border: "1px solid #ccc", padding: 8, marginBottom: 8 }}>
          <h3>{job.company} — {job.role}</h3>
          <p>Status: <span style={{ color: job.status === "Rejected" ? "red" : job.status === "Applied" ? "orange" : "green" }}>{job.status}</span></p>
          <button onClick={() => navigate(`/jobs/${job.id}`)}>View / Edit</button>
          <button onClick={() => job.id !== undefined && onDelete(job.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
