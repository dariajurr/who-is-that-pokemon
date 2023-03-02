class Api {
  constructor({ baseUrl, imageUrl, headers }) {
    this._baseUrl = baseUrl;
    this._imageUrl = imageUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getAllPokemons() {
    return fetch(`${this._baseUrl}pokemon?limit=100`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getImage(id){
    return `${this._imageUrl}${id}.svg`;
  }
}

const PokemonsApi = new Api({
  baseUrl: "https://pokeapi.co/api/v2/",
  imageUrl:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default PokemonsApi;