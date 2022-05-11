const pokedex = document.querySelector(".pokedex");

const promises = [];

for (let i = 1; i <= 150; i++) {
  const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  promises.push(fetch(url).then((res) => res.json()));
}

const drawPokedex = (pokemonData) => {
  const pokemonHTMLString = pokemonData
    .map(
      (pokemon) =>
        `<li class="card">
           <img class="card-image" src="${pokemon.image}"/>
           <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
           <p class="card-subtitle">Type: ${pokemon.type}</p>
        </li>`
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

Promise.all(promises).then((data) => {
  const pokemon = data.map((item) => ({
    name: item.name,
    id: item.id,
    image: item.sprites["front_default"],
    type: item.types.map((type) => type.type.name).join(", "),
  }));
  drawPokedex(pokemon);
});
