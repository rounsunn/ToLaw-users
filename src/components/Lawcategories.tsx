import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";

const Lawcategories = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategorySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCategory(value);
    if (value) {
      navigate(`/search?category=${encodeURIComponent(value)}`);
    }
  };

  return (
    <div className="w-full my-[70px] relative">
      <div className="bg-[#0C253F] text-white p-3 rounded-lg flex items-center justify-between">
        Law Categories
        <IoIosArrowDown className='w-5 h-5' />
      </div>
      <select
        onChange={handleCategorySelect}
        value={selectedCategory}
        className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer bg-[#0C253F] text-white"
      >
        <option value="Criminal">Criminal Law</option>
        <option value="Property">Property Law</option>
        <option value="Family">Family Law</option>
        <option value="Tax">Tax Law</option>
      </select>
    </div>
  );
};

export default Lawcategories;
