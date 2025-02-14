import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Form = () => {
    const [data, setdata] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    })

    const [errors, seterrors] = useState({});

    const handlechange = (e) => {
        const { name, value } = e.target;
        setdata({
            ...data,
            [name]: value,
        })
        validateForm({
            ...data,
            [name]: value,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length > 0) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/submit', data);
            console.log(response.data);
            alert('Form Submitted Successfully;')
            setdata({
                username: '',
                email: '',
                password: '',
                confirmpassword: ''
            });
        }
        catch (error) {
            alert("Error Submitting the details to server , error")
        }

    }
    const validateForm = (data) => {
        const temp_errors = {};
        if (!data.username.trim()) {
            temp_errors.username = 'username is required';
        }
        if (data.username.length < 4) {
            temp_errors.username = 'username must be greater'
        }
        if (!/\S+@\S+\.\S+/.test(data.email)) {
            temp_errors.email = 'invalid email';
        }
        if (!data.email.trim()) {
            temp_errors.email = 'invalid email';
        }
        if (!data.password) {
            temp_errors.password = 'Password is required';
        }
        if (data.password.length < 8) {
            temp_errors.password = 'Password must be at least 8 characters long';
        }
        if (data.confirmpassword !== data.password) {
            temp_errors.confirmpassword = 'Passwords do not match';
        }
        seterrors(temp_errors);
    }

    return (
        <div className='flex flex-col justify-center items-center border-4 border-gray-800 w-[50%] mx-auto bg-gray-900 text-white'>
            <div className='w-[50%]'>
                <p className='text-4xl'>Form Validation</p>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col border-4 gap-4 w-full p-[5%]'>
                        <label>Username:</label>
                        <input onChange={handlechange} required value={data.username} type='text' name='username' className='border-2 rounded-2xl text-black w-full' ></input>
                        {errors.username && (
                            <span className="error-message">
                                {errors.username}
                            </span>
                        )}
                        <label>email:</label>
                        <input onChange={handlechange} required value={data.email} type='email' name='email' className='border-2 rounded-2xl text-black' ></input>
                        {errors.email && (
                            <span className="error-message">
                                {errors.email}
                            </span>
                        )}
                        <label>password:</label>
                        <input onChange={handlechange} required value={data.password} type='text' name='password' className='border-2 rounded-2xl text-black' ></input>
                        {errors.password && (
                            <span className="error-message">
                                {errors.password}
                            </span>
                        )}
                        <label>confirmpassword:</label>
                        <input onChange={handlechange} required value={data.confirmpassword} type='text' name='confirmpassword' className='border-2 rounded-2xl text-black' ></input>
                        {errors.confirmpassword && (
                            <span className="error-message">
                                {errors.confirmpassword
                                }
                            </span>
                        )}
                        <button type='submit' className='bg-blue-700  my-4 rounded-2xl w-[30%] mx-auto p-2'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form