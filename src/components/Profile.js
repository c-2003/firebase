import React, { useEffect, useState } from 'react'
import { auth, db } from './firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();
    
    const fetchUserData = async() =>{
        auth.onAuthStateChanged(async (user)=>{
            if(!auth.currentUser){
                window.location.href = "/login"
            }
            // console.log(auth);

            const docRef =  doc(db,"Users",user.uid);
            const docSnap = await getDoc(docRef);
            // console.log(docSnap());
            if(docSnap.exists()){
                setUserDetails(docSnap.data())
                // console.log(docSnap.data());
            }else{
                console.log("User is not loggedin");

            }
        })
    } 

    useEffect(()=>{
       fetchUserData(); 
    
    },[]);

    const handleLogout=  (e) => {
       e.preventDefault();
            auth.signOut()
            .then(() => {
                window.location.href = "/login"
            })
            .catch(e => {
                console.log("Some error occured");
            })
    }

    return (
    <div className='profile'>Profile
        {userDetails ?
        <>
            <h3> Welcome {userDetails.firstName}</h3>
            <div>
                <p> Email : {userDetails.email}</p>
                <p> First Name : {userDetails.firstName}</p>
                <p> Last Name : {userDetails.lastName}</p>
            </div>
            <button className='btn btn-primary' onClick={handleLogout}>
                logout
            </button>
        </>
        :
        <h3>
        <p>Loading...</p>
        </h3>
    }
    </div>
  )
}

export default Profile