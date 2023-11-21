import React, {useState, useCallback} from 'react';
import './SearchBar.css';


const SearchBar = (props) =>{
const [term, setTerm] = useState('');

const handleTermChange = useCallback((event) =>{
setTerm(event.target.value);
},[]);
const search = useCallback((term) =>{
props.onSearch(term);
},[]);

return (
    <div>
        <input placeholder='Find Song' onClick={handleTermChange}/>
        <button className='search-button'>SEARCH</button>
    </div>
);
};


export default SearchBar;