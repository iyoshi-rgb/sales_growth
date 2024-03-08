'use client'
import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction, createContext, useState } from 'react'
import EditSale from './EditSale';

export const ModalContext = createContext<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);




const EditModal = (editInfo: any) => {

  const EditInfo = editInfo;
  console.log(EditInfo);
 
  const [isOpen, setIsOpen] = useState(true);


  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center transition-opacity duration-300'>
          <div className='bg-white p-5 rounded transition-transform duration-300 transform scale-95 hover:scale-100'>
            <EditSale EditInfo={EditInfo}/>

            <Button onClick={toggleModal} variant='ghost'>
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
export default EditModal;
