export const PokemonCards = ({ pokemonData }) => {
    if (!pokemonData || !pokemonData.stats || !pokemonData.abilities) {
        return <div className="card">Data not available</div>;
    }

    return (
        <div className="card">
            <h2>{pokemonData.name}</h2>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />

            <p>Base Stat: {pokemonData.stats[0]?.base_stat || "N/A"}</p>

            
            <div className="grid-three-cols">
                <p className="pokemon-info">
                    <span>Height: </span>{pokemonData.height}
                </p>
                <p className="pokemon-info">
                    <span>Weight: </span>{pokemonData.weight}
                </p>
                <p className="pokemon-info">
                    <span>Speed: </span>{pokemonData.stats[5]?.base_stat || "N/A"}
                </p>
            </div>

            
            <div className="grid-four-cols">
                <div className="pokemon-info">
                    <span>Experience:</span>
                    <p>{pokemonData.base_experience || "N/A"}</p>
                </div>
                <div className="pokemon-info">
                    <span>Attack:</span>
                    <p>{pokemonData.stats[1]?.base_stat || "N/A"}</p>
                </div>
            </div>

            <div className="extra-info">
                <div className="pokemon-info">
                    <span>Abilities:</span>
                    <p>{pokemonData.abilities?.map((abilityInfo) => abilityInfo.ability.name).join(", ") || "N/A"}</p>
                </div>
            </div>
        </div>
    );
};






// export const PokemonCards=({pokemonData})=>{
//     return <li className="pokemon-card">
//         <figure>
//             <img src={pokemonData.sprites.other.dream_world.front_default} 
//             alt={pokemonData.name}
//             className="pokemon-image"
//             />
//         </figure>
//         <h1 className="pokemon-name">{pokemonData.name}</h1>
//         <div className="pokemon-info pokemon-highlight">
//             <p>
//                 {pokemonData.types.map((curType)=>curType.type.name).join(", ")}
//             </p>
//         </div>

//         <div className="grid-three-cols">
//             <p className="pokemon-info">
//                 <span>Height: </span>{pokemonData.height}
//             </p>
//             <p className="pokemon-info">
//                 <span>Weight: </span>{pokemonData.weight}
//             </p>
//             <p className="pokemon-info">
//                 <span>Speed: </span>{pokemonData.stats[5].base_stat}
//             </p>
//         </div>

//         <div className="grid-three-cols">
//             <div className="pokemon-info">
//                 <span>Experience:</span>
//                 <p>{pokemonData.base_experience}</p>
//             </div>
//             <div className="pokemon-info">
//                 <span>Attack:</span>
//                 <p>{pokemonData.stats[1].base_stat}</p>
//             </div>
//             <div className="pokemon-info">
//                 <span>Abilities:</span>
//                 <p>{pokemonData.abilities.map((abilityInfo)=>abilityInfo.ability.name).slice(0,1).join(",")}</p>
//             </div>
//         </div>
        
//         </li>

// };


