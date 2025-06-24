import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import { PokemonCards } from "./PokemonCards";



export const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [offset, setOffset] = useState(0); 
    const [isFocused, setIsFocused] = useState(false);


    const BATCH_SIZE = 50;

    const fetchPokemonBatch = async () => {
        try {
            
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${BATCH_SIZE}`
            );
            const data = await response.json();

            
            const fetchDetails = data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                const details = await res.json();
                return { ...details, uniqueId: uuidv4() };
            });

            
            const batchData = await Promise.all(fetchDetails);
            setPokemon((prev) => [...prev, ...batchData]);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemonBatch();
    }, [offset]); 

    
    const loadMorePokemon = () => {
        setOffset((prev) => prev + BATCH_SIZE);
    };

    
    const filteredPokemon = pokemon
        .filter((curPokemon) =>
            curPokemon.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter((curPokemon, index, self) =>
            index === self.findIndex((t) => t.name === curPokemon.name)
        );

    if (loading && pokemon.length === 0) {
        return <h1 className="loading">LOADING...</h1>;
    }

    if (error) {
        return <h1 className="error">{error.message}</h1>;
    }

    return (
        <>
            <section className="container">
                <header>
                    <h1>Let's Catch Pokémon</h1>
                </header>
                <div className="pokemon-search">
                    <input 
                        type="text" 
                        placeholder={isFocused ? "" : "Search Pokémon"} 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </div>

                <ul className="cards">
                    {filteredPokemon.map((curPokemon) => (
                        <PokemonCards key={curPokemon.uniqueId} pokemonData={curPokemon} />
                    ))}
                </ul>
                <button onClick={loadMorePokemon} className="load-more">
                    Load More Pokémon
                </button>
                <section className="ending">
    <a href="https://www.linkedin.com/in/shivamkr2002/" target="_blank" rel="noopener noreferrer">
        <h7>Made by Shivam as, React mini project.</h7>
    </a>
</section>
            </section>
            
        </>
    );
};






// import { useEffect, useState } from "react";
// import "./index.css";
// import { PokemonCards } from "./PokemonCards";


// export const Pokemon =()=>{


//     const [pokemon,setPokemon]=useState([]);
//     const [loading,setLoading]=useState(true);
//     const[error, setError]=useState(null);
//     const[search,setSearch]=useState("");
//     const API = "https://pokeapi.co/api/v2/pokemon?limit=124";
//     const fetchPokemon =async()=>{
//         try{
//             const res = await fetch(API);
//             const data = await res.json();
//             // console.log(data);

//             const detailedPokemonData = data.results.map(async(curPokemon)=>{
//                 // console.log(curPokemon.url);
//                 const res = await fetch(curPokemon.url);
//                 const data = await res.json();
//                 // console.log(data);
//                 return data;
//             });
//             // console.log(detailedPokemonData);

//             const detailedResponses = await Promise.all(detailedPokemonData);
//             console.log(detailedResponses);
//             setPokemon(detailedResponses);
//             setLoading(false);
//         }catch(error){
//             console.log(error);
//             setLoading(false);
//             setError(error);
//         }
//     }

//     useEffect(()=>{
//         fetchPokemon();
//     },[]);

//     const searchData =pokemon.filter((curPokemon)=> 
//         curPokemon.name.toLowerCase().includes(search.toLowerCase()));


//     if(loading){
//         return(
//             <div>
//                 <h1>LOADING....</h1>
//             </div>
//         );
//     }

//     if(error){
//         return(
//             <div>
//                 <h1>{error.message}</h1>
//             </div>
//         );
//     }
//     return(
//         <>
//         <section className="container">
//             <header>
//                 <h1>Lets Catch Pokemon</h1>
//             </header>
//             <div className="pokemon-search">
//                 <input type="text" placeholder="search Pokemon" value={search} onChange={(e)=>setSearch(e.target.value)}/>
//             </div>
//             <div>
//                 <ul className="cards">
//                     {
//                         searchData.map((curPokemon)=>{
//                             // return <li key={curPokemon.id}>{curPokemon.name}</li>
//                             return (
//                             <PokemonCards key={curPokemon.id} pokemonData={curPokemon}/>
//                         );
//                         })
//                     }
//                 </ul>
//             </div>
//         </section>
//         {/* <h1>Hello Pokemon Once again</h1> */}
//         </>
//     );
// };

