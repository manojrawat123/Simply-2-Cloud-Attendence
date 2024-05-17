import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeadingO from '../../component/CommonCmp/Heading/HeadingO';

const ManageLeaves = () => {

    const navigate = useNavigate();
  return (
    <div className='h-[100vh] bg-gray-200 flex items-center justify-center'>
    <div className='h-[80%] w-[30rem] bg-white my-auto mx-auto p-4 rounded-xl'> 
    <div className='' style={{
      // display : "flex", flexDirection : "column" , justifyContent : "space-between", height : "70%"
    }}>
      
      <HeadingO mainHeading={"Simply 2 Cloud"} subHeading={"Manage Leaves"}/>


      <div className='md:mx-0 md:my-0 my-10 mx-4'>
      <div className="flex justify-center items-center py-4">
        <button
          onClick={()=>{
            navigate("/oneleave")
          }}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300 w-full "
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
          className="bg-black w-full text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring transition duration-300"
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
