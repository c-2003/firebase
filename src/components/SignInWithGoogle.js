import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

export const SignInWithGoogle = () =>{
    const googleLogin = () =>{
         const provider = new GoogleAuthProvider();
         signInWithPopup(auth, provider)
         .then(async (res) => {
            if(res.user){
                const user = auth.currentUser;
                await setDoc(doc(db,"Users", user.uid),{
                    email : user.email,
                    firstName : user.displayName.split(' ')[0],
                    lastName : user.displayName.split(' ')[1]
                });
                toast.success("User logged in successfully",{position:"top-center"});
                window.location.href = '/profile';
            }
         }).catch(err=>{
            console.log(err.message)
         })
    }

    return (
        <div>
            <p className="continue-p">-- or --</p>
            <div onClick={googleLogin}>
                <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*lE0aykaLr4IdtlRMw1e6kw.jpeg" alt="someting went wrong" width={"60%"}/>
            </div>
        </div>
    )
}

export default SignInWithGoogle