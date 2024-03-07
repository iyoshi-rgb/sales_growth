'use client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import AddSale from './AddSale'

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Button onClick={toggleModal} variant="outline">
        Add 
      </Button>
      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center transition-opacity duration-300'>
          <div className='bg-white p-5 rounded transition-transform duration-300 transform scale-95'>
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
