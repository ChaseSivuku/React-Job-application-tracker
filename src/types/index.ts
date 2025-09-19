export type Job = {
    id?: number,
    userId: number,
    company: string,
    role: string,
    status: "Applied" | "Interviewed" | "Rejected"
    dateApplied: string,
    details?: string
}

export type User = {
  id: number;
  username: string;
  password: string;
};