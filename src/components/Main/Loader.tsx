import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className='w-full text-center flex justify-center lg:justify-start items-center lg:pb-16'>
      <div className="w-[70px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <radialGradient id="a8" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
            <stop offset="0" stopColor="#FCBA08"></stop>
            <stop offset=".3" stopColor="#FCBA08" stopOpacity=".9"></stop>
            <stop offset=".6" stopColor="#FCBA08" stopOpacity=".6"></stop>
            <stop offset=".8" stopColor="#FCBA08" stopOpacity=".3"></stop>
            <stop offset="1" stopColor="#FCBA08" stopOpacity="0"></stop>
          </radialGradient>
          <circle fill="none" stroke="url(#a8)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70">
            <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2s" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
          </circle>
          <circle fill="none" opacity=".2" stroke="#FCBA08" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle>
        </svg>
      </div>
    </div>
  );
};

export default Loader;
