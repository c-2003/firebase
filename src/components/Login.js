import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from './firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SignInWithGoogle from './SignInWithGoogle';

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();
    

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth,email,password)
        .then(res => {
            console.log("User LoggedIn Successfully");
            toast.success("Welcome",{
                position : "top-center"
            });
            navigate('/profile')
            //alternative
            // window.location.href = '/profile';

        })
        .catch(err =>{
            console.log(err.message);
            toast.error(err.message,{
                position : "bottom-center"
            });
        });
    }

  return (
    <form>
        <h3>Login</h3>
        <div className='mb-3'>
            <label> Email Adress:</label>
            <input 
                type='email'
                className='form-control'
                placeholder='Enter Email'
                value={email}
                onChange= {e => setEmail(e.target.value)
                
                }
            />
        </div>

        <div className='mb-3'>
            <label> Password:</label>
            <input
                type='password'
                className='form-control'
                placeholder='Enter Password'
                value={password}
                onChange= {e => setPassword(e.target.value)}
            />
        </div>
        <div className='d-grid'>
            <button type='submit' className='btn btn-primary mb-3' onClick={handleSubmit}>Submit</button>
        </div>
        <p className='forgot-passwrd text-right'>New User? <a href='/register'>Register here</a> </p>
        <SignInWithGoogle />
    </form>
    
  )
}

export default Login