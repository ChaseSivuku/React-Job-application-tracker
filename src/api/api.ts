import axios from 'axios';
import type { Job, User} from '../types'

const JOBS_URL = 'http://localhost:3000/jobs';
const USERS_URL = 'http://localhost:3000/users';

export async function getJobs(params?: any): Promise<Job[]>{
    const res = await axios.get(JOBS_URL, {params});
    return res.data;
}

export async function getJob(id: number): Promise<Job> {
  const res = await axios.get(`${JOBS_URL}/${id}`);
  return res.data;
}

export async function createJob(job: Omit<Job, "id">): Promise<Job> {
    const res = await axios.post(JOBS_URL, job);
    return res.data;
}

export async function deleteJob(id: number): Promise<void>{
    await axios.delete(`${JOBS_URL}/${id}`);
}

export async function updateJob(id: number, updates: Partial<Job>): Promise<Job> {
  const res = await axios.patch(`${JOBS_URL}/${id}`, updates);
  return res.data;
}

export async function login(username: string, password: string): Promise<User | null>{
    const res = await axios.get(USERS_URL, {params: {username, password}})
    return res.data.length ? res.data[0]: null;
}

export async function register(user: Omit<User, "id">): Promise<User>{
    const res = await axios.post(USERS_URL, user);
    return res.data;
}
