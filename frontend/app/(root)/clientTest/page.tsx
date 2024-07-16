"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';


export default function page() {

    const { data: session } = useSession()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/user/username/sukomal06', {
                    headers: {
                        Authorization: `Bearer ${session?.user.accessToken}`
                    }
                })
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [session?.user.accessToken])
    return (
        <div>
            hello
        </div>
    )
}
