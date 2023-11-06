document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.getElementById("cardContainer");

    // URL API untuk mengambil 20 Pokemon pertama
    const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

    // Mengambil data dari API
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const results = data.results;

            results.forEach((pokemon) => {
                const pokemonUrl = pokemon.url;

                // Mengambil data lebih lanjut untuk setiap Pokemon
                fetch(pokemonUrl)
                    .then((response) => response.json())
                    .then((pokemonData) => {
                        const card = createPokemonCard(pokemonData);
                        cardContainer.appendChild(card);
                    })
                    .catch((error) => {
                        console.error("Error fetching Pokemon data: " + error);
                    });
            });
        })
        .catch((error) => {
            console.error("Error fetching Pokemon list: " + error);
        });
          
    function createPokemonCard(pokemonData) {
        const card = document.createElement("div");
        card.className = "card";

        const name = document.createElement("h3");
        name.textContent = pokemonData.name;

        const detailButton = document.createElement("button");
        detailButton.className = "detail-button";
        detailButton.textContent = "Detail";

        const image = document.createElement("img");
        image.src = pokemonData.sprites.front_default;
        image.alt = pokemonData.name;
        image.style.display = "none"; // Awalnya disembunyikan

        // Event listener untuk tombol "Detail"
        detailButton.addEventListener("click", () => {
            // Toggle tampilan gambar saat tombol "Detail" ditekan
            if (image.style.display === "none") {
                image.style.display = "block";
            } else {
                image.style.display = "none";
            }
        });

        card.appendChild(name);
        card.appendChild(detailButton);
        card.appendChild(image);

        return card;
    }
});
