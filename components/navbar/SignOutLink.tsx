import { SignOutButton } from '@clerk/nextjs'
import { Link } from 'lucide-react'
import React from 'react'
import toast, { useToaster } from 'react-hot-toast'

function SignOutLink() {
  const handleLogout = () => {
    toast('Logout Successful')
  }
  return (
    <SignOutButton>
      <button className='w-full text-left'>logout</button>
    </SignOutButton>
  )
}

export default SignOutLink
