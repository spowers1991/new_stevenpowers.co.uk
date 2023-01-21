import React from 'react';

const SearchFilter = ({ searchTerm, setSearchTerm, filteredData, setFilteredData, posts }) => {
    return (
        <div className="max-w-5xl mx-auto px-10 mb-5">
            <input className="rounded block w-full my-8 p-2  border-2 border-black border-solid focus:border-solid placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black text-sm" placeholder='Type to search...'  type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
    )
}

export default SearchFilter;
