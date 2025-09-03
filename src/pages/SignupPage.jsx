import React, {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import api from '../services/api';

const SignupPage = () =>{
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSignup = async(e) =>{
        e.preventDefault();
        setError('');
        setSuccess('');
        try{
            await api.post('/auth/signup',{username,password});
            setSuccess('SignUp successful! Redirecting to login...');
            setTimeout(()=>{
                navigate('/login');
            },2000); //wait 2 seconds before redirecting
        }catch(err){
            setError('Signup failed. Username might already be taken');
            console.log(err);
        }
    };

    return(
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    required
                />
                <input 
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    required
                />
                <button type='submit'>Signup</button>
            </form>
            {error && <p style={{color:'red'}}>{error}</p>}
            {success && <p style={{color:'green'}}>{success}</p>}
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default SignupPage;