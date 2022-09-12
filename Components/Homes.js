import React, { useEffect } from 'react'
import axios from 'axios'
import HomeTop from './HomeTop'
import HomeBottom from './HomeBottom'
const Homes = ({datas}) => {
  

  return (
    <div className='w-full bg-[#EEF2FF] h-screen overflow-x-hidden '>
      <HomeTop datas={datas}/>
    </div>
  )
}



export default Homes
