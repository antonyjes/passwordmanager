"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
    const router = useRouter();

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            router.push('/auth/login')
        }
    }

    return (
        <form>
            <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="Name" className="text-black" />
            <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Email" className="text-black" />
            <input type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Password" />
            <button onClick={registerUser}>Register</button>
        </form>
    )
}

export default Register;