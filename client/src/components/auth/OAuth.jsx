import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { config } from "../../../config";
import toast from "react-hot-toast";
import { PiSpinnerGapBold } from "react-icons/pi";



export default function OAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleGoogleClick = async () => {
 
    const provider = new GoogleAuthProvider();
    
    try {

      setIsLoading(true);

      const result = await signInWithPopup(auth, provider);
      // const credential = GoogleAuthProvider.credentialFromResult(result);

      if(!result?.user?.uid) {
        alert("Unable to login, please try again");

        return;
      }

      let res = await fetch(`${config.baseUrl}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();

      if(!res.ok) {
        toast.error(data?.message)
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/", {replace: true});
      // navigate(0)
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.error('The popup was closed before completing the sign-in process.', error);
        toast.error("Unable to signin, please try again")  
      } else {
        console.error('An error occurred during sign-in:', error);
        toast.error("An error occured, please try again")    
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
    disabled={isLoading}
      onClick={handleGoogleClick}
      type="button"
      className="mt-2 p-3 w-full disabled:cursor-not-allowed disabled:bg-red-400 bg-red-600 text-white rounded flex items-center justify-center"
    >
        {
            isLoading
            ? <PiSpinnerGapBold className="text-white animate-spin" />
            : "Continue with google"
        }
      
    </button>
  );
}
