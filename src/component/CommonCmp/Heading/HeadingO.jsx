import React from 'react';

const HeadingO = ({ mainHeading, subHeading }) => {
  return (
    <div className="w-[100%] text-center">
      <h1 className="text-4xl text-green-800 font-bold">{mainHeading}</h1>
      <p className="text-gray-500 text-lg font-bold mb-5">{subHeading}</p>
    </div>
  );
};

export default HeadingO;
