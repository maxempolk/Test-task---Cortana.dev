"use server";
import { cookies } from 'next/headers';
import config from '@/config/server';
import { User } from '@/auth/types/user';

export const me = async () => {
  const cookieStore = await cookies();

  if (!cookieStore.has('accessToken')) {
    return null;
  }

  const cookieHeader = cookieStore
    .getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');

  try {
    const res = await fetch(`${config.baseUrl}/api/auth/me`, {
      headers: {
        'Cookie': cookieHeader,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }
    
    const user = await res.json() as User;
    return user;
  } catch{
    return null;
  }
}