import React from 'react'
import { MdClose } from 'react-icons/md';
import { useSearchParams,  } from 'react-router-dom';
import ResetPassword from './ResetPassword';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import AuthModal from '../modals/AuthModal';

const AuthForm = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const isSignIn = searchParams.get("auth") === "sign-in";
    const isSignUp = searchParams.get("auth") === "sign-up";
    const isPasswordReset = searchParams.get("auth") === "reset-password";

    const showModal = isSignIn || isSignUp || isPasswordReset;
  
    const handleCloseModal = () => {
        if(searchParams.has("auth")) {
            searchParams.delete("auth")
            setSearchParams(searchParams)
        }
    }

  return (
    <>
    <AuthModal onCloseModal={() => handleCloseModal()} showModal={showModal}>

    <div  className="relative mx-auto border w-full md:max-w-96 shadow-lg rounded-md bg-white" >
        <button
          onClick={handleCloseModal}
          className="absolute group top-2 right-2 h-8 w-8 flex items-center justify-center text-lg rounded-full hover:bg-gray-200 duration-300"
        >
          <MdClose  className="text-gray-500 group-hover:text-gray-600" />
        </button>

        <div className="flex p-5 flex-col items-center justify-center" onClick={event => event.stopPropagation()}>
            <img
                src="..\logo\ADLM Studio Logo PNG-07.png" 
                alt="ADLM Logo" 
                className="w-20 mx-auto" 
            />

            {isSignIn && <SignInForm />}
            {isSignUp && <SignUpForm />}
            {isPasswordReset && <ResetPassword />}

        </div>
        
      </div>

    </AuthModal>
    </>
  )
}

export default AuthForm