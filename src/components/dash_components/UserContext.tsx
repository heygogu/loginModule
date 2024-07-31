'use client'
import { createContext, useState, useEffect, ReactNode } from 'react'
import { parseCookies } from 'nookies'
import allapi from '@/handleapi/allapi'
import Header from './Header'

interface UserData {
  _id: string
  first_name: string
  last_name: string
  email: string
  country_code: string
  phone: string
  profile_pic: string
}

interface UserContextType {
  userData: UserData | null
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}


 

  

