"use client"
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSelector } from 'react-redux';

function useAllowAccessRouter() {
    const router = useRouter();
    const pathname = usePathname();

    const isAuth = useSelector((state) => state.auth.isAuth);

    useEffect(() => {
        console.log('Auth', isAuth);
        if (!isAuth) {
            router.push('auth/logout');
        } else {
            if (pathname.includes('login') || pathname.includes('register')) {
                router.push('/home');
            } else {
                router.push(pathname);
            }
        }
    }, [isAuth])
}

export default useAllowAccessRouter