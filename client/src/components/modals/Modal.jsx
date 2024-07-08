import React from 'react'

const Modal = ({children, showModal, onCloseModal}) => {
   
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
        <div onClick={onCloseModal} className="fixed px-2 z-50 inset-0 bg-white bg-opacity-50 backdrop-blur-md overflow-y-auto min-h-dvh w-full" >
          <div className="w-full h-screen flex flex-col items-center justify-center" >
            {children}
          </div>
        </div>
      )
}


export default Modal