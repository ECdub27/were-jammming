import React, {useState, useCallback} from 'react';
import './SearchBar.css';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = (props) => {
const [term, setTerm] = useState('');



const handleTermChange = useCallback((event) =>{
setTerm(event.target.value);

},[]);

const search = useCallback(() =>{
props.onSearch(term);

},[props.onSearch, term]);

return (
    <div className='searchbar-div'>
       <TextField size="small" defaultValue='Find Song,Artist,Album'> <input placeholder='Find' onChange={handleTermChange}/> </TextField>
        <Button size="small" variant='contained' color='secondary'className='search-button' onClick={search}>SEARCH <SearchIcon /></Button>
    </div>
);
};


export default SearchBar;