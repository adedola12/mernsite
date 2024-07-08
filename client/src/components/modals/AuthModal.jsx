import React, { useEffect } from 'react'

const AuthModal = ({children, showModal, onCloseModal}) => {

  const handleEscKeyPress = (event) => {
    if(event.keyCode === 27) {
      onCloseModal();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeyPress);
    return () => document.removeEventListener("keydown", handleEscKeyPress);
  }, [onCloseModal])

  if(!showModal) return null;

  return (
    <div onClick={onCloseModal} className="fixed z-50 inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-md overflow-y-auto min-h-dvh w-full" >
      <div className="w-full h-full flex flex-col items-center  px-2 justify-center" >
        {children}
      </div>
    </div>
  )
}

export default AuthModal