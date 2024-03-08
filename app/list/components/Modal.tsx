'use client'
import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction, createContext, useState } from 'react'
import AddSale from './AddSale'
import { boolean } from 'zod';

export const ModalContext = createContext<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);




const Modal = () => {
 
  const [isOpen, setIsOpen] = useState(false);


  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <ModalContext.Provider value={{isOpen,setIsOpen}}>
      <Button onClick={toggleModal} variant="outline">
        Add 
      </Button>
      {isOpen && (
        <div className=''>
          <div className=''>        
            <AddSale/>

            <Button onClick={toggleModal} variant='ghost'>
                Close
            </Button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}
export default Modal;
