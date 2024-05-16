import React from 'react';

const Field = (props) => {
  return (
    <input
      {...props}
      className="rounded-full text-green-800 px-4 py-2 w-11/12 bg-gray-300 my-2"
      placeholderTextColor="text-green-800"
    />
  );
};

export default Field;
