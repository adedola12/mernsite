
import React, { createContext, useContext, useEffect } from 'react'


const ModalContext = createContext();



const TestModal = ({children, isOpen, onClose}) => {

    const handleEscKey = (event) => {
        if(event.keyCode === 27) {
            onClose();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleEscKey);
        return () => document.removeEventListener("keydown", handleEscKey)
    }, [])

    if(!isOpen) return null;

  return (
    <div onClick={onClose} className='fixed px-2 z-50 inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-md overflow-y-auto h-full w-full' >
        <div className="wrapper" onClick={event => event.stopPropagation()}>
             <ModalContext.Provider value={{onClose}}>
                {children}
             </ModalContext.Provider>
            <button type='button' onClick={onClose}>Close Modal</button>
        </div>
    </div>
  )
}

const ModalHeader = ({children, }) => {
    return <>
    <div className="">
        <div className="">
            {children}
        </div>
        <CloseButton>
            Close Modal
        </CloseButton>
    </div>
    </>
}

const ModalBody = ({children}) => {
    return <>
    <div className="">
        {children}
    </div>
    </>
}

const CloseButton = ({children, className}) => {
    const { onClose } = useContext(ModalContext);
    return (
        <button type='button' onClick={onClose}>
            {children}
        </button>
    )
}

const ModalFooter = ({children}) => {
    return <>
    <div className="">
        {children}
    </div>
    </>
}

TestModal.Header = ModalHeader;
TestModal.Container = ModalBody;
TestModal.CloseModal = CloseButton;
TestModal.Footer = ModalFooter;

export default TestModal