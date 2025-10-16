/** Async function to fetch Pokemon data
 * from the PokeAPI and display it on the webpage.
 * Handles errors gracefully and updates the DOM accordingly.
 */

let ALL_POKEMONS = [];

async function fetchData() {
  const pokemonDataEl = document.getElementById("pokemon-data");
  pokemonDataEl.innerText = "Please wait while we fetch the Pokemon's Data";

  try {
    const pokemonNameEl = document.getElementById("pokemonName");
    const pokemonName = document
      .getElementById("pokemonName")
      .value.toLowerCase()
      .trim();

    // Validate Users Input (Cannot be empty && Must be valid pokemon)
    if (!pokemonNameEl.value) {
      return (pokemonDataEl.innerText = "Input cannot be empty");
    } else if (!ALL_POKEMONS.includes(pokemonName)) {
      return (pokemonDataEl.innerText = "Please enter a valid pokemon");
    }

    // Fetching data from the PokeAPI for a specific Pokemon
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    // Checking if the response is okay
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }
    // Parsing the JSON data from the responses
    const data = await response.json();
    const types = data.types.map((t) => t.type.name).join(", ");
    const abilities = data.abilities.map((a) => a.ability.name).join(", ");

    pokemonDataEl.innerHTML = `      
      <img
          src="${data.sprites.other["official-artwork"].front_default}"
          alt="Pokemon Sprite"
          id="pokemonSprite"
        />      
      <p id="name">Name: ${data.name}</p>
      <p id="type">Type: ${types}</p>
      <p id="abilities">Abilities: ${abilities}</p>            
      <p id="id">ID: ${data.id}</p>
      <p id="height">Height: ${data.height / 10} Meters</p>
      <p id="weight">Weight: ${data.weight / 10} Kg</p>
      `;

    const card = document.getElementById("pokemon-data");
    const primary = Array.isArray(types)
      ? (types[0] || "").toLowerCase()
      : String(types || "").toLowerCase();

    if (primary) card.setAttribute("data-type", primary);
  } catch (err) {
    console.error(err);
    pokemonDataEl.innerText =
      "Sorry, we are having some temporary server issues";
  }
}

/**
 * ========== TO DO LIST ==========
 * 1. Better Pictures - COMPLETE
 * 2. ID - COMPLETE
 * 3. Abilities - COMPLETE
 * 4. Height + Weight - COMPLETE
 */

/**
 * jQuery function to set up autocomplete on the #pokemonName input field.
 * Fetches a list of all Pokemon names from the PokeAPI and uses that list
 * to provide autocomplete suggestions as the user types.
 */
$(async function () {
  try {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000"
    );

    if (!res.ok) {
      throw new Error("Could Not Fetch Pokemon Resource");
    }

    const data = await res.json();
    const allPokemon = data.results.map((pokemon) => pokemon.name); // Fetching list of all Pokemon (up to 2000)
    ALL_POKEMONS = allPokemon;

    $("#pokemonName").autocomplete({
      source: function (request, response) {
        const term = request.term.toLowerCase();

        // Filter and sort so list displays closer matching items first
        const results = allPokemon
          .filter((name) => name.includes(term))
          .sort((a, b) => {
            const ia = a.indexOf(term);
            const ib = b.indexOf(term);
            return ia - ib;
          })
          .slice(0, 20);
        response(results);
      },
    });
  } catch (err) {
    console.error(err);
  }
});
