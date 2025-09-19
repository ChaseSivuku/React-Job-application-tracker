import jsonServer from 'json-server';

type Job = {
    companyName: string,
    role: string,
    status: string,
    dateApplied: string,
    details: string
}

type User = {

    id: number,
    username: string,
    password: string,
    jobs: Job []
}

async function getUsers(){

    const response = await fetch('http://localhost:3000/users');
    const data = await response.json() as User[];
    return data; 
}