import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";

export default function OAuth({ onClose }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    try {

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
      
      dispatch(signInSuccess(data));
      onClose();
      navigate("/");
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.error('The popup was closed before completing the sign-in process.', error);
      } else {
        console.error('An error occurred during sign-in:', error);        
      }
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="mt-2 p-3 w-full bg-red-600 text-white rounded"
    >
      Continue with google
    </button>
  );
}
