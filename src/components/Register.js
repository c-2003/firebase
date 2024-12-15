import React, {useState} from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth, db } from './firebase';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    // console.log(createUserWithEmailAndPassword);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();
    
    const handleRegister = (e) =>{
        
        e.preventDefault();
        const user = createUserWithEmailAndPassword(auth,email,password)
        .then((res)=> {
            // console.log(res);
            console.log(auth.currentUser)
            // auth.currentuser = user.user (the res is object(userCredentialInformation) containing user which contains userImpl which is same as auth.currentUser)
            // but it does not contain name or other fields. for that we need to use firestore db
            return res.user
        })
        .then(user => {
            console.log(user);
            setDoc(doc(db,"Users", user.uid),{
                email : email,
                firstName : firstName,
                lastName : lastName
            });
            console.log("User Registerd successfully");
            toast.success("User Registered Successfully",{
                position : "top-center"
            })
            navigate('/profile')
        })
        .catch(err =>{
            console.log(err.message);
            toast.error(err.message,{
                position : "bottom-center"
            })
        });
    }



      return (
        <form>
            <h3>Register</h3>
            <div className='mb-3'>
                <label> First Name:</label>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Enter First Name'
                    value={firstName}
                    onChange= {e => setFirstName(e.target.value)}
                />
            </div>
    
            <div className='mb-3'>
                <label> Last Name:</label>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Enter Last Name'
                    value={lastName}
                    onChange= {e => setLastName(e.target.value)}
                />
            </div>
    
            <div className='mb-3'>
                <label> Email Adress:</label>
                <input
                    type='email'
                    className='form-control'
                    placeholder='Enter Email'
                    value={email}
                    onChange= {e => setEmail(e.target.value)}
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
                <button type='submit' className='btn btn-primary' onClick={handleRegister}>Submit</button>
            </div>
            <p className='forgot-passwrd text-right'>Already have an account? <a href='/login'>Sign in</a> </p>
        </form>
      )
}

export default Register