import React from 'react'
import HeadingO from '../../component/CommonCmp/Heading/HeadingO'

const MonthSupport = ({ data }) => {
  return (
    <div className="  bg-white rounded  h-[80vh] overflow-y-scroll border p-4 text-gray-700">
      {Object.entries(data).map(([date, attendance], index) => (
        <div key={index} className={`py-4 rounded border my-3 text-center cursor-pointer hover:bg-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'}`} >
          <h1 className='text-xl font-bold'>{date}:</h1>
          {attendance.leave ? <h1 style={{ color: "red" }}>Leave </h1> : <>
            {attendance.checkinTime || attendance.checkoutTime ?
            <div className=' items-center justify-center'>
              <h1>Checkin Time: {attendance.checkinTime ? attendance.checkinTime : ""}</h1>
              <h1>Checkout Time: {attendance.checkoutTime ? attendance.checkoutTime : ""}</h1>
            </div> : <span className='text-[red] font-bold'> No Check In And Checkout!</span>}
          </>}
        </div>
      ))}
    </div>
  )
}

export default MonthSupport
