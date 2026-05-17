document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    loadRestaurantsFromDatabase();
    loadRecommendationTable();
    loadRestaurantDetail();
});

// tamsus stilius ijungiamas ir isjungiamas
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// is MangoDb restoranai
async function loadRestaurantsFromDatabase() {
    const restaurantList = document.getElementById("restaurantList");

    if (!restaurantList) return;

    try {
        const response = await fetch("/api/restaurants");

        if (!response.ok) {
            throw new Error("Nepavyko gauti restoranų iš serverio");
        }

        const restaurants = await response.json();

        restaurantList.innerHTML = "";

        if (restaurants.length === 0) {
            restaurantList.innerHTML = `
                <div class="info-box">
                    <h3>Restoranų dar nėra</h3>
                    <p>Restoranus galima pridėti administravimo puslapyje.</p>
                </div>
            `;
            return;
        }

        restaurants.forEach(function (restaurant) {
            restaurantList.innerHTML += `
                <article class="restaurant-card" data-city="${restaurant.city}">
                    <img
                        src="img/${restaurant.image}"
                        alt="${restaurant.name} restorano nuotrauka"
                        onerror="this.src='img/restoranas1.jpg'"
                    >

                    <div class="card-body">
                        <span class="tag">${restaurant.cuisine}</span>

                        <h3>${restaurant.name}</h3>

                        <p>${restaurant.description}</p>

                        <ul class="mini-list">
                            <li>Miestas: ${restaurant.city}</li>
                            <li>Įvertinimas: ${restaurant.rating}/10</li>
                            <li>Verta paragauti: ${restaurant.dish}</li>
                        </ul>

                        <a href="restoranas.html?id=${restaurant._id}" class="btn btn-primary">
                            Plačiau
                        </a>
                    </div>
                </article>
            `;
        });
    } catch (error) {
        restaurantList.innerHTML = `
            <div class="alert alert-danger">
                Nepavyko užkrauti restoranų. Patikrink, ar serveris paleistas.
            </div>
        `;

        console.error("Klaida užkraunant restoranus:", error);
    }
}

// filtravimas pagal miesta
function filterCity(city) {
    const cards = document.querySelectorAll(".restaurant-card");

    cards.forEach(function (card) {
        const cardCity = card.getAttribute("data-city");

        if (city === "visi" || cardCity === city) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// paieska pagal pavadinima
function searchRestaurants() {
    const input = document.getElementById("searchInput");

    if (!input) return;

    const searchValue = input.value.toLowerCase();
    const cards = document.querySelectorAll(".restaurant-card");

    cards.forEach(function (card) {
        const title = card.querySelector("h3").textContent.toLowerCase();

        if (title.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// lankytojo pasiulymas i mangobb
async function submitSuggestion(event) {
    event.preventDefault();

    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");

    if (successMessage) successMessage.classList.add("d-none");
    if (errorMessage) errorMessage.classList.add("d-none");

    const suggestion = {
        name: document.getElementById("pavadinimas").value,
        city: document.getElementById("miestas").value,
        cuisine: document.getElementById("virtuve").value,
        dish: document.getElementById("patiekalas").value,
        rating: Number(document.getElementById("vertinimas").value),
        comment: document.getElementById("komentaras").value,
        userName: document.getElementById("vardas").value
    };

    try {
        const response = await fetch("/api/suggestions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(suggestion)
        });

        if (!response.ok) {
            throw new Error("Nepavyko išsaugoti pasiūlymo");
        }

        if (successMessage) {
            successMessage.classList.remove("d-none");
        }

        event.target.reset();

        setTimeout(function () {
            if (successMessage) {
                successMessage.classList.add("d-none");
            }
        }, 4000);
    } catch (error) {
        if (errorMessage) {
            errorMessage.classList.remove("d-none");
        }

        console.error("Klaida siunčiant pasiūlymą:", error);
    }
}

// rekomendacijos
async function loadRecommendationTable() {
    const table = document.getElementById("recommendationTable");

    if (!table) return;

    try {
        const response = await fetch("/api/restaurants");

        if (!response.ok) {
            throw new Error("Nepavyko gauti restoranų");
        }

        const restaurants = await response.json();

        table.innerHTML = "";

        if (restaurants.length === 0) {
            table.innerHTML = `
                <tr>
                    <td colspan="6">Restoranų dar nėra.</td>
                </tr>
            `;
            return;
        }

        restaurants.forEach(function (restaurant) {
            table.innerHTML += `
                <tr>
                    <td>${restaurant.name}</td>
                    <td>${restaurant.city}</td>
                    <td>${restaurant.address || "Nenurodytas"}</td>
                    <td>${restaurant.cuisine}</td>
                    <td>${restaurant.rating}/10</td>
                    <td>${restaurant.dish}</td>
                </tr>
            `;
        });
    } catch (error) {
        table.innerHTML = `
            <tr>
                <td colspan="6">Nepavyko užkrauti duomenų.</td>
            </tr>
        `;

        console.error(error);
    }
}

// detalus puslapis
async function loadRestaurantDetail() {
    const detailBox = document.getElementById("restaurantDetail");

    if (!detailBox) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        detailBox.innerHTML = "<p>Restoranas nerastas.</p>";
        return;
    }

    try {
        const response = await fetch(`/api/restaurants/${id}`);

        if (!response.ok) {
            throw new Error("Restoranas nerastas");
        }

        const restaurant = await response.json();

        const mapQuery = restaurant.address
            ? `${restaurant.address}, ${restaurant.city}`
            : `${restaurant.name}, ${restaurant.city}`;

        detailBox.innerHTML = `
            <img 
                src="img/${restaurant.image}" 
                alt="${restaurant.name} nuotrauka"
                onerror="this.src='img/restoranas1.jpg'"
            >

            <div class="detail-content">
                <h1>${restaurant.name}</h1>

                <p>${restaurant.description}</p>

                <h2>Ką verta paragauti</h2>
                <ul>
                    <li>${restaurant.dish}</li>
                </ul>

                <h2>Pagrindinė informacija</h2>
                <ul>
                    <li>Miestas: ${restaurant.city}</li>
                    <li>Adresas: ${restaurant.address || "Adresas nenurodytas"}</li>
                    <li>Virtuvė: ${restaurant.cuisine}</li>
                    <li>Įvertinimas: ${restaurant.rating}/10</li>
                </ul>

                <h2>Vieta žemėlapyje</h2>

                <iframe
                    src="https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed"
                    title="${restaurant.name} vieta žemėlapyje">
                </iframe>

                <h2>Kodėl rekomenduojama</h2>
                <p>
                    Ši vieta rekomenduojama dėl maisto kokybės, atmosferos ir lankytojų įvertinimo.
                </p>

                <br>

                <a href="index.html" class="btn btn-secondary">← Grįžti į pagrindinį puslapį</a>
                <a href="siulyti.html" class="btn btn-success">Siūlyti kitą restoraną</a>
            </div>
        `;
    } catch (error) {
        detailBox.innerHTML = "<p>Nepavyko užkrauti restorano informacijos.</p>";
        console.error(error);
    }
}