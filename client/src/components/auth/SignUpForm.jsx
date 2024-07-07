import React, { useState } from 'react'
import OAuth from './OAuth'
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { config } from '../../../config';
import { PiSpinnerGapBold } from "react-icons/pi";

const SignUpForm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [formInput, setFormInput] = useState({
      username: "",
      email: "",
      password: ""
    });

    const [isLoading, setIsLoading] = useState(false)

    const handleChangeAuthUrl = (urlString) => {
        navigate(`?auth=${urlString}`);
    }

    if(!searchParams.get("auth")) {
      setFormInput({
        username: "",
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
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const res = await fetch(`${config.baseUrl}/api/auth/sign-up`, {
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
        
        navigate("/", {replace: true});
        navigate(0)
      } catch (error) {
        toast.error("An error occured, please try again")
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Sign Up</h1>
          <p className="text-sm text-gray-500 my-2">Sign up to sell on ADLM</p>

          <form onSubmit={handleSubmit} className="mt-2">
            <input
              type="text"
              placeholder="Username"
              className="mt-2 p-3 w-full border rounded"
              id="username"
              name="username"
              autoComplete='off'
              value={formInput.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="mt-2 p-3 w-full border rounded"
              autoComplete="off"
              id="email"
              name="email"
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
            type='submit'
              disabled={isLoading}
              className="mt-2 p-3 disabled:cursor-not-allowed disabled:bg-[#00263d85] w-full bg-[#00263D] text-white rounded flex items-center justify-center"
            >
             {
              isLoading
              ? <PiSpinnerGapBold className="text-white animate-spin text-center " />
              : "SIGN UP"
              }

            </button>
 
          </form>
          <OAuth />
          <div className="flex my-5 mx-auto max-w-lg gap-2">
            <p>Already have an account?</p>
            <button type='button' onClick={() => handleChangeAuthUrl("sign-in")}>
              <span className="text-blue-600">Sign in</span>
            </button>
          </div>
    </>
  )
}

export default SignUpForm