import React, { useState, useEffect, useRef } from 'react';

interface DropdownProps<T> {
  options: T[];
  onSelect: (value: T) => void;
  initialValue?: T;
  displayValue?: (value: T) => string; // Optional function to format display text
}

const Dropdown = <T,>({ options, onSelect, initialValue, displayValue }: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<T | undefined>(initialValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle option selection
  const handleOptionClick = (option: T) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  // Render display text for an option
  const renderOption = (option: T) => (displayValue ? displayValue(option) : String(option));

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption !== undefined ? renderOption(selectedOption) : 'Select an option'}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option, index) => (
              <button
                key={index} // Use index as key if options are primitives; otherwise, provide a unique key
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleOptionClick(option)}
              >
                {renderOption(option)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;