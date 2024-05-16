import React from 'react';

export default function Btn({ bgColor, btnLabel, textColor, Press, width }) {
  return (
    <button
      onClick={Press}
      className={`rounded-md text-lg font-bold py-2 px-4 my-2 ${
        width ? width : 'w-64'
      } ${bgColor}`}
    >
      {btnLabel}
    </button>
  );
}

export function Btn2({ btnLabel, textColor, Press, width }) {
  return (
    <button
      onClick={Press}
      className={`rounded-md text-base font-bold py-2 px-4 my-2 ${
        width ? width : 'w-64'
      } border-2 border-green-500`}
    >
      {btnLabel}
    </button>
  );
}

export function Btn3({ btnLabel, textColor, Press, width }) {
  return (
    <button
      onClick={Press}
      className={`rounded-md text-base font-bold py-2 px-4 my-2 ${
        width ? width : 'w-64'
      } border-2 border-white`}
    >
      {btnLabel}
    </button>
  );
}
