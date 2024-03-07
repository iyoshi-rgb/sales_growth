'use client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import AddSale from './AddSale'
import { createContext } from 'vm';

export const ModalOpen = createContext();

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const value = {isOpen,setIsOpen};

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
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
    </>
  )
}
export default Modal;
