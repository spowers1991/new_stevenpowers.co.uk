import React, { useRef} from 'react';

const SearchFilter = ({ searchTerm, setSearchTerm, filteredData, setFilteredData, posts }) => {
    
    const inputRef = useRef(null);

    return (
        <div className="max-w-5xl mx-auto px-10 mb-5">
            <div className="relative">
            <input ref={inputRef} className="focus:outline-0 duration-200 rounded block w-full my-8 p-2  border-2 hover:border-black focus:border-black border-solid focus:border-solid placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black text-sm z-20" placeholder='Type to search...'  type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                { searchTerm !== '' && 
                    <button className="absolute top-0 right-2 bottom-0 text-2xl z-20" onClick={() => setSearchTerm('')}>
                        X
                    </button>
                }
            </div>
        </div>
    )
}

export default SearchFilter;
