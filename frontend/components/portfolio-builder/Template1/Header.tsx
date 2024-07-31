'use client'
import React from 'react'
import { useFormContext } from 'react-hook-form';

interface HeaderProps {
    name: string;
    label: string;
    image: string;
    email: string;
    phone: string;
    links: Link[];
    imgUrl: string;
  }
  interface Link {
    social: string;
    url: string;
  }

const Header = () => {
    
    

    console.log(personalInfo)

  return (
    
  )
}

export default Header
