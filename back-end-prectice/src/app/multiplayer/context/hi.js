// import { createContext, useContext, useState } from 'react';

// const PokemonContext = createContext(null);

// export const PkemonProvider = ({ children }) => {
//   const [pokemons, setPokemons] = useState([]);

//   return (
//     <PokemonContext.Provider value={{ pokemons, setPokemons }}>
//       {children}
//     </PokemonContext.Provider>
//   );
// };

// export const usePokemonContext = () => useContext(PokemonContext);