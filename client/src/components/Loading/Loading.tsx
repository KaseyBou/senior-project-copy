import React from 'react';
import './Loading.css';
const Loading = (props : any) => {
  return (
    <div
      className={
        props.size === 'small'
          ? 'half-circle-spinner-small center'
          : 'half-circle-spinner center'
      }
    >
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
    </div>
  );
};
export default Loading;