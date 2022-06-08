const Search = (props) => {
    return (
      <div> find countries
        <input type="text" value={props.search} onChange={props.handleSearch} />
      </div>
    )
  }

  export default Search;