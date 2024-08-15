import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean
}

const TWButton: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button
      type='button'
      className={`${disabled ? "invisible": ""} relative px-4 py-[2px] overflow-hidden font-medium text-gray-800 bg-gray-200 border border-gray-200 rounded-lg shadow-inner group w-16`}
      onClick={onClick}
    >
      <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-800 group-hover:w-full ease"></span>
      <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-800 group-hover:w-full ease"></span>
      <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-800 group-hover:h-full ease"></span>
      <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-800 group-hover:h-full ease"></span>
      <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-200"></span>
      <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
        {children}
      </span>
    </button>
  );
};

export default TWButton;
