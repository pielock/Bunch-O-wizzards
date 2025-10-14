async function fetchData() {
  try {
    const pokemonName = document
      .getElementById("pokemonName")
      .value.toLowerCase();

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();

    const pokemonDataEl = document.getElementById("pokemon-data")
    const pokemonSprite = data.sprites.front_default; // Img Src 
    const imgEl = document.getElementById("pokemonSprite");

    console.log(data);
    let types = ""
    data.types.forEach(t => types += t.type.name + " ")

    pokemonDataEl.innerHTML = `
      <img
          src="${data.sprites.front_default}"
          alt="Pokemon Sprite"
          id="pokemonSprite"
        />
      <p>${data.name}</p>
      <p>${types}</p>
      
      `
      
    
  } catch (err) {
    console.error(err);
  }
}