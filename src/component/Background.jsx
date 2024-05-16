import React from 'react';
// import leaves from "../img/leaves.jpg";

const Background = ({ children }) => {
  return (
    <div className="bg-cover bg-no-repeat bg-center h-screen relative">
      {/* <img
        src={leaves}
        alt="Background Leaves"
        className="absolute inset-0 w-full h-full object-cover z-[-1]" // Adjust z-index if needed
      /> */}
      {children}
    </div>
  );
};

export default Background;
