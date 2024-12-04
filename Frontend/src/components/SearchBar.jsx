import React from 'react';
import './TodoPage.css'; // Add styles for the search bar if needed

const SearchBar = ({ searchQuery, onSearch }) => {
    return (
        <div className="text-[1rem] search-bar-container text-black border-[3px] border-white p-[16] bg-[#161616] rounded-full ">
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="bg-transparent text-white p-[0.3rem] outline-none focus:outline-none w-full ml-5"
            />
        </div>
    );
};

export default SearchBar;
