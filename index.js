/** Async function to fetch Pokemon data
 * from the PokeAPI and display it on the webpage.
 * Handles errors gracefully and updates the DOM accordingly.
 */
async function fetchData() {
  const pokemonDataEl = document.getElementById("pokemon-data");
  pokemonDataEl.innerText = "Please wait we are fetching the Pokemon's Data";

  try {
    const pokemonName = document
      .getElementById("pokemonName")
      .value.toLowerCase();
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

    console.log(data); // <-- Logging data to see what data we can pull
    const types = data.types.map((t) => t.type.name).join(", ");

    pokemonDataEl.innerHTML = `
      <img
          src="${data.sprites.front_default}"
          alt="Pokemon Sprite"
          id="pokemonSprite"
        />
      <img
          src="${data.sprites.other["official-artwork"].front_default}"
          alt="Pokemon Sprite"
          id="pokemonSprite"
        />      
      <p>${data.name}</p>
      <p>${types}</p>
      `;
  } catch (err) {
    console.error(err);
    pokemonDataEl.innerText =
      "Sorry, we are having some temporary server issues";
  }
}

/**
 * ========== TO DO LIST ==========
 * 1. Better Pictures - COMPLETE
 * 2. ID
 * 3. Abilities
 * 4. Height + Weight
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
      throw new Error("Could Not Fetch Pokemon Resource"());
    }

    const data = await res.json();
    const allPokemon = data.results.map((pokemon) => pokemon.name); // Fetching list of all Pokemon (up to 2000)

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

fetchData();
