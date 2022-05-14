import React from 'react'
import Header from './Header'
import Footer from './Footer'
import '../styling/AppBody.scss'
import { User } from '../interfaces/AuthContextInterface'
const AppBody = ({currentUser, children} : appBodyProps) => {
  return (
    <div className="AppBody">
      <Header/>
      <div className='wrapper'>
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default AppBody

interface appBodyProps {
  currentUser?: User, 
  children: JSX.Element | JSX.Element[]
}