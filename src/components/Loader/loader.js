'use client'
import React from 'react'
import './loader.css'

const Loader = () => {
  return (
    <>
    <div className='mask' >
    </div>
      <img src="/loader.gif" width={150} height={150} alt="Loading..."/>
    </>
  )
}

export default Loader