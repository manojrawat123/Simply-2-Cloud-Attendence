import React from 'react'

const MonthSupport = () => {
  return (
    <div >
    {Object.entries(data).map(([date, attendance], index) => (
      <div key={index} style={styles.item}>
        <h1 style={styles.date}>{date}:</h1>
      {attendance.leave ?  <h1 style={{color : "red"}}>Leave </h1>:  <><h1>checkinTime: {attendance.checkinTime ? attendance.checkinTime : "---"}</h1>
        <h1>checkoutTime: {attendance.checkoutTime ? attendance.checkoutTime : "---"}</h1>
        </>  }  
      </div>
    ))}
  </div>
  )
}

export default MonthSupport
