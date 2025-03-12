

import React, { useEffect, useState } from 'react'
import User from './user'

const Github_Finder = () => {
    const [username, setusername] = useState("senthilkumaranN")
    const [userdata, setuserdata] = useState([])
    const [loading, setloading] = useState(false)

    async function fetchdata() {
        try {
            setloading(true)
            const response = await fetch(`https://api.github.com/users/${username}`)
            const data = await response.json()
            console.log(data)
            if (data) {
                setuserdata(data)
                setloading(false)
            }

        } catch (e) {
            console.log(e)
            setloading(false)
        }
    }

    function handleOnClick() {
        fetchdata()
        setusername("")
    }

    useEffect(() => {
        fetchdata()
    }, [])

    if (loading) return <p>Please wait! Loading</p>

    return (
        <div className='min-h-screen mt-7 flex flex-col justify-center items-center'>
            <div className='mb-3'>
                <input className='border-2 bg-slate-100 shadow-md p-3 rounded-2xl'
                    name="search-by-username"
                    placeholder='Search github profile'
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                />
                <button className="font-bold mx-3 bg-blue-500 p-3 rounded-2xl text-white" onClick={handleOnClick}>Search</button>
            </div>
            <div className='mt-3 border-2 w-[900px] min-h-[500px] rounded-lg border-black'>
                {
                    userdata !== null ?
                        <User user={userdata} />
                        : null
                }
            </div>
        </div>
    )
}

export default Github_Finder