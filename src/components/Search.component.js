import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ searchText, setSearchText }) => {
  const handleChange = (event) => {
    setSearchText(event.target.value);
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Find your favourite super hero here..."
        inputProps={{ 'aria-label': 'Find your favourite super hero here' }}
        value={searchText}
        onChange={handleChange}
        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default Search;