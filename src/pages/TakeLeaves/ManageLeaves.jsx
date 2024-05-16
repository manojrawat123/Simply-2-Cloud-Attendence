import React from 'react'
import { useNavigate } from 'react-router-dom'

const ManageLeaves = () => {

    const navigate = useNavigate();
  return (
    <div className=''>
    <div className='md:flex md:items-center md:justify-center h-[80vh] '>    
    <div className='' style={{
      display : "flex", flexDirection : "column" , justifyContent : "space-between", height : "70%"
    }}>
      <div>
        <h1 className='text-5xl md:text-6xl font-bold  text-white md:mx-0 md:my-0 my-10 mx-4'>Simply 2 Cloud 
        <br />Attendence</h1>
      </div>

      <div className='md:mx-0 md:my-0 my-10 mx-4'>
      <div className="flex justify-center items-center py-4">
        <button
          onClick={()=>{
            navigate("/oneleave")
          }}
            className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-900 hover:to-green-500 text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
          >
        Take one day leave
          </button> 
          
        </div>
        <div className="flex justify-center items-center py-4">
          <button
          onClick={()=>{
            navigate("/customleave");
          }}
             className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-900 hover:to-green-500 text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
             >
          Take Custom Leave
          </button>
        </div>
        <div className="flex justify-center items-center py-4">
          <button
          onClick={()=>{
            navigate("/leavedetails");
          }}
             className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-900 hover:to-green-500 text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
             >
         Leaves Details
          </button>
        </div>
        </div>
    </div>
    
    </div>
    </div>
  )
}

export default ManageLeaves
