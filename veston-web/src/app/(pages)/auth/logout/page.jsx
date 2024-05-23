"use client"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { COOKIE_KEY } from '@/web.config';
import Cookies from "js-cookie"
import { logout } from '@/app/redux/slice/authSlice';

function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    Cookies.remove(COOKIE_KEY.API_TOKEN_KEY);
  }, [])

  return <></>
}

export default Logout