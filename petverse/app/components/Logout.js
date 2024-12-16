"use client"

import {useRouter} from 'next/navigation'

export default function Logout() {

  const router = useRouter()

  const handleLogout = () => router.push('/auth/login')
   
  
  return (
    
    <>
      <div>
        <button className="custom-button " onClick={handleLogout}>Log out</ button>
      </div>
    </>
  );
}
