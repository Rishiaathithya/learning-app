import React from 'react'
import { useState } from 'react'
const Button_Animation = () => {
    const [loading, setisLoading] = useState(false);
    const handlechange = () => {
        setisLoading(true);
        setTimeout(() => {
            setisLoading(false)
            let form = document.getElementById("my-form");
            if (form) {
                form.reset();
            }
        }, 2000);
    }
    return (
        <div>
            <form id="my-form" className=''>
                <input type="text" name="name" placeholder="Enter your name" className='border-4 rounded mt-4' />

                <button onClick={handlechange} id="loadbutton" type="button" disabled={loading}
                    className={`py-4 px-2 bg-blue-600 rounded-2xl ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 "} `} >
                    {loading ? "loading.." : "submit"}</button>
            </form>
            {loading && (
                <span
                    id="loader"
                    className="inline-block mt-2 text-blue-500 animate-spin"
                >
                    🔄
                </span>
            )}
        </div>
    )
}

export default Button_Animation