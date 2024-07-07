import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { signInFaliure, signInStart, signInSuccess } from '../../redux/user/userSlice';
import { config } from '../../../config';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { PiSpinnerGapBold } from "react-icons/pi";
import OAuth from './OAuth';


const SignInForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
  
    const [formInput, setFormInput] = useState({
    email: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false)

  if(!searchParams.get("auth")) {
    setFormInput({
      email: "",
      password: ""
    })
  }


  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

    const handleChangeAuthUrl = (urlString) => {
        navigate(`?auth=${urlString}`);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {

        setIsLoading(true);
        dispatch(signInStart());
  
        const res = await fetch(`${config.baseUrl}/api/auth/sign-in`, {
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

        dispatch(signInSuccess(data));
        navigate("/", {replace: true});
        navigate(0)
      } catch (error) {
        toast.error("An error occured, please try again")
        dispatch(signInFaliure(error.message));
      } finally {
        setIsLoading(false)
      }
    };


  return (
    <>
       <h3 className="text-lg leading-6 font-medium text-gray-900">
            Sign In
        </h3>
        <p className="text-sm text-gray-500">Welcome Back</p>
    <form onSubmit={handleSubmit} className="mt-2" >
        <input
        type="email"
        placeholder="Email"
        className="mt-2 p-3 w-full border rounded"
        id="email"
        name="email"
        autoComplete="off"
        value={formInput.email}
        onChange={handleChange}
        required
        />
        <input
        type="password"
        placeholder="Password"
        autoComplete="off"
        className="mt-2 p-3 w-full border rounded"
        id="password"
        name="password"
        value={formInput.password}
        onChange={handleChange}
        required
        />

        <button
        type="button"
        className="text-sm text-blue-600 mt-3 hover:underline"
        onClick={() => handleChangeAuthUrl("reset-password")}
        >
        Forgot Password?
        </button>

        <button
        type="submit"
        disabled={isLoading}
        className="mt-2 p-3 w-full disabled:cursor-not-allowed disabled:bg-[#00263d85] bg-[#00263D] text-white rounded  flex items-center justify-center"
        >
            {
              isLoading
              ? <PiSpinnerGapBold className="text-white animate-spin" />
              : "SIGN IN"
            }
        </button>
        </form>

        <OAuth />
        <div className="flex my-5 mx-auto max-w-lg gap-2 items-center justify-center">
        <p>Don{"'"}t have an account?</p>
        <button type='button' onClick={() => handleChangeAuthUrl("sign-up")} className="text-[#828282]">
          <span className="text-blue-600">Signup</span>
        </button>
        </div>
    
    </>
  )
}

export default SignInForm