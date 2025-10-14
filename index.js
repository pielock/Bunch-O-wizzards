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
    const pokemonSprite = data.sprites.front_default;
    const imgEl = document.getElementById("pokemonSprite");

    imgEl.src = pokemonSprite;
    imgEl.style.display = "block";
  } catch (err) {
    console.error(err);
  }
}