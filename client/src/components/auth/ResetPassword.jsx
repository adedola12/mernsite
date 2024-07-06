
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { config } from '../../../config';
import { PiSpinnerGapBold } from "react-icons/pi";


const ResetPassword = () => {
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
      email: "",
    });
    const [isLoading, setIsLoading] = useState(false)

    const handleChangeAuthUrl = (urlString) => {
        navigate(`?auth=${urlString}`);
    }

    const handleChange = (e) => {
      setFormInput({
        ...formInput,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {

        setIsLoading(true);
        
        const res = await fetch(`${config.baseUrl}/api/auth/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInput),
        });

        const data = await res.json();

        if(!res.ok) {
          toast.error(data?.message)
          return;
        }

        navigate("/");
      } catch (error) {
        toast.error("An error occured, please try again")
      } finally {
        setIsLoading(false);
      }
    };


  return (
    <>
      <h1 className="text-lg leading-6 font-medium text-gray-900 py-2">Forgot Password</h1>
      <form onSubmit={handleSubmit} id="forgot-password" >
      <input
        type="email"
        placeholder="Enter your email"
        className="mt-2 p-3 w-full border rounded"
        id="email"
        name="email"
        autoComplete='off'
        value={formInput.email}
        onChange={handleChange}
        required
      />
      <button
        type="button"
        className="text-sm text-center w-full text-blue-600 my-3 hover:underline "
        onClick={() => handleChangeAuthUrl("sign-in")}
      >

        Login with email and password?
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 p-3 w-full disabled:cursor-not-allowed disabled:bg-red-400 bg-red-600 text-white rounded flex items-center justify-center"
      >
        {
        isLoading
        ? <PiSpinnerGapBold className="text-white animate-spin text-center " />
        : "Reset Password"
        }
      </button>
    </form>
    </>
  )
}

export default ResetPassword