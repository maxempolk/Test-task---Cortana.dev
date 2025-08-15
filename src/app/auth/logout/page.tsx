"use client";
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { UserContext, UserContextType } from '@/app/UserProvider';
import { logout } from '@/fetches/logout';

function LogoutPage() {
  const { setUser } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    const logoutUser = async () => {
      logout().then(async () => {
        setUser(null);
        window.location.href = '/';
      });
  }

  logoutUser();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className='text-2xl font-bold'>Loading...</p>
    </div>
  )
}

export default LogoutPage