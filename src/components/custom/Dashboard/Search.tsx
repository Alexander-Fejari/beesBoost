import React, { useState } from 'react';
import useSearchStore from '@/store/SearchStore.tsx'

const SearchComponent = () => {
    const [token, setToken] = useState('');
    const { keyword, searchResults, isLoading, setKeyword, performSearch } = useSearchStore();

    const handleSearch = async () => {
        if (keyword.trim() !== '') {
            await performSearch(keyword, token);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search..."
            />
            <button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {searchResults.map((resultGroup, index) => (
                        <div key={index}>
                            <h3>{resultGroup.type}</h3>
                            <ul>
                                {resultGroup.results.map((item, idx) => (
                                    <li key={idx}>
                                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                                            {item.title || item.username || JSON.stringify(item)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
