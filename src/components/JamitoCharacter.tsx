
import React from 'react';

const JamitoCharacter = ({ size = 'lg', animate = true }: { size?: 'sm' | 'md' | 'lg', animate?: boolean }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32'
  };
  
  return (
    <div className={`relative ${sizeClasses[size]}`}>
      {/* Cuerpo de Jamito */}
      <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center overflow-hidden">
        {/* Cara de Jamito */}
        <div className="relative w-3/4 h-3/4 bg-white rounded-full">
          {/* Ojos */}
          <div className="absolute top-1/3 left-1/4 w-1/6 h-1/4 bg-black rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-1/6 h-1/4 bg-black rounded-full"></div>
          
          {/* Boca */}
          <div className="absolute bottom-1/4 left-1/4 right-1/4 h-1/6 bg-black rounded-full"></div>
        </div>
      </div>
      
      {/* Mano saludando */}
      <div className={`absolute -right-1/4 top-1/4 w-1/3 h-1/6 bg-primary rounded-full origin-bottom-left ${animate ? 'animate-wave' : ''}`}></div>
    </div>
  );
};

export default JamitoCharacter;
