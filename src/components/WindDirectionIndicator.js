import React from 'react';
import { WiDirectionUp } from 'react-icons/wi';

const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

const WindDirectionIndicator = ({ direction }) => {
  return (
    <div className="relative flex items-center justify-center w-32 h-32 sm:w-48 sm:h-48">
      <WiDirectionUp
        className="text-5xl sm:text-6xl absolute"
        style={{ transform: `rotate(${direction}deg)` }}
      />
      <div className="absolute text-center w-full h-full flex items-center justify-center">
        {directions.map((dir, index) => (
          <div
            key={index}
            className="absolute text-xs sm:text-sm"
            style={{ transform: `rotate(${index * 45}deg) translate(0, -250%)` }}
          >
            {dir}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WindDirectionIndicator;
