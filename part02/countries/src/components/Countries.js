import Country from "./Country";

const flexDiv = {
    display: 'flex',
    alignItems: 'center',
    gap: '1vw'
};

const Countries = (props) => {
    return (
      <div>
        {props.countries.length !== 1
          ? props.countries.map(country =>
            <div key={country.name.common} style={flexDiv}>
              <p>{country.name.common}</p>
              <button onClick={() => props.displayCountry(country.name.official)}>show</button>
            </div>)
          : <Country country={props.countries[0]}/> // display details of the only country left
        }  
      </div>
    )
  }

  export default Countries;