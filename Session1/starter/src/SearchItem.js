import React from 'react'

const SearchItem = ({search, setSearch}) => {
  return (
    <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search">search</label>
      <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" id='search' role='searchbox' placeholder='search items'/>
    </form>
  )
}

export default SearchItem
