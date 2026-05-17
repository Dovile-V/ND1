import { useState } from "react";
import axios from "axios";

function RestaurantForm({ reloadData }) {
    const [restaurant, setRestaurant] = useState({
        name: "",
        city: "",
        address: "",
        cuisine: "",
        rating: "",
        dish: "",
        image: "",
        description: ""
    });

    function handleChange(event) {
        setRestaurant({
            ...restaurant,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await axios.post("http://localhost:5050/api/restaurants", {
                ...restaurant,
                rating: Number(restaurant.rating)
            });

            alert("Restoranas sukurtas");

            setRestaurant({
                name: "",
                city: "",
                address: "",
                cuisine: "",
                rating: "",
                dish: "",
                image: "",
                description: ""
            });

            reloadData();
        } catch (error) {
            console.log(error.response?.data || error);
            alert("Klaida kuriant restoraną");
        }
    }

    return (
        <div className="card">
            <h2>Pridėti restoraną</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Pavadinimas"
                    value={restaurant.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="city"
                    placeholder="Miestas"
                    value={restaurant.city}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Tikslus adresas, pvz. Laisvės al. 90, Kaunas"
                    value={restaurant.address}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="cuisine"
                    placeholder="Virtuvė"
                    value={restaurant.cuisine}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="rating"
                    placeholder="Įvertinimas 1-10"
                    min="1"
                    max="10"
                    value={restaurant.rating}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="dish"
                    placeholder="Rekomenduojamas patiekalas"
                    value={restaurant.dish}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Nuotrauka, pvz. restoranas1.jpg"
                    value={restaurant.image}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Restorano aprašymas"
                    value={restaurant.description}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Sukurti restoraną</button>
            </form>
        </div>
    );
}

export default RestaurantForm;