import Link from 'next/link'
import React from 'react'
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button'
import { SettingsMenu } from './SettingsMenu';

const Nav = () => {
  return (
    <div className="border-b border-b-gray-400">
        <div className="flex items-center justify-start mb-3 mx-5 pt-2">
            <Link href={'/home'}>
            <div className="text-xl font-semibold pr-6">
                Sales Growth
            </div>
            </Link>
            <nav className='flex justify-between flex-grow ml-4'>
                <ul className="flex space-x-4">
                    <Link href={'/about'}>
                        <li><Button className="text-gray-600 hover:text-black">About</Button></li>
                    </Link>
                    <Link href={'/list'}>
                        <li><Button className="text-gray-600 hover:text-black">Attack List</Button></li>
                    </Link>
                    <Link href={'/contact'}>
                        <li><Button className="text-gray-600 hover:text-black">Contact</Button></li>
                    </Link>
                </ul>
            </nav>
                <SettingsMenu />
            </div>
       
        </div>
  )
}

export default Nav
