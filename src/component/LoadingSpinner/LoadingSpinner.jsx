import React from 'react';
import { RingLoader } from 'react-spinners';

const Loading = () => {
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <RingLoader color={'#36D7B7'} loading={true} size={150} />
    </div>
  );
};

export default Loading;
