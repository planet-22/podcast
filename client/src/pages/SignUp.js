import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function SignUp(props) {
    const navigate=useNavigate();
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [file,setFile]=useState('');
    const [confirmPassword,setConfirmPasword]=useState('');

    const handleRegister=async(e)=>{
        e.preventDefault();
      try {
        if(password===confirmPassword){
            try {
                const url=`http://localhost:5000/api/register`;
                const response= await fetch(url,{
                    method:"POST",
                    body:JSON.stringify({
                        pic:1,
                        username,
                        email,
                        password:confirmPassword
                    }),
                    headers:{
                        "content-type":"application/json"
                    }
                })
                const parseRes=await response.json();
                console.log(parseRes);
                if(parseRes.error){
                    toast.error(parseRes.error)
                }else{
                    toast.success(parseRes.msg);
                    localStorage.setItem('userID',parseRes._id);
                    localStorage.setItem('pic',parseRes.pic);
                    localStorage.setItem('username',parseRes.username);
                    localStorage.setItem('email',parseRes.email);
                    sessionStorage.setItem('userToken',parseRes.token);
                    navigate('/');
                    setTimeout(()=>{
                        window.location.reload()
                    },200)
                }
            } catch (error) {
                console.log(error.message);
                toast.error(error.message);
            }
           }else{
            toast.error("Password doesn't match ☠!")
           }
      } catch (error) {
        toast.error(error.message)
      }
    }
    return (
        <>
        <Navbar/>
            <div className='sign-in '>
                <form onSubmit={handleRegister}>
                    <label>Username</label>
                    <input type='text' placeholder='Kevin' onChange={e=>setUsername(e.target.value)} required/>
                    <label>Email</label>
                    <input type='email' placeholder='example@gmail.com' onChange={e=>setEmail(e.target.value)} required/>
                    <label>Password</label>
                    <input type='password' onChange={e=>setPassword(e.target.value)} required/>
                    <label>Confirm Password</label>
                    <input type='password' onChange={e=>setConfirmPasword(e.target.value)} required/>
                    <label>Upload your avatar</label>
                    <input type='file' onChange={e=>setFile(e.target.value)} required/>
                    <div className='link-btn'>
                        <button>Submit</button> <Link to='/login'>I have an account?</Link>
                    </div>
                </form>
            </div>   
        </>
    );
}

export default SignUp;