import { useEffect, useState } from "react";
import axios from "axios";

function RestaurantList({ refresh, reloadData }) {
    const [restaurants, setRestaurants] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [editForm, setEditForm] = useState({
        name: "",
        city: "",
        cuisine: "",
        rating: "",
        dish: "",
        image: "",
        description: ""
    });

    useEffect(() => {
        fetchRestaurants();
    }, [refresh]);

    async function fetchRestaurants() {
        try {
            const response = await axios.get(
                "http://localhost:5050/api/restaurants"
            );

            setRestaurants(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteRestaurant(id) {
        if (!window.confirm("Ar tikrai nori ištrinti restoraną?")) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:5050/api/restaurants/${id}`
            );

            reloadData();
        } catch (error) {
            console.error(error);
        }
    }

    function startEdit(restaurant) {
        setEditingId(restaurant._id);

        setEditForm({
            name: restaurant.name,
            city: restaurant.city,
            cuisine: restaurant.cuisine,
            rating: restaurant.rating,
            dish: restaurant.dish,
            image: restaurant.image,
            description: restaurant.description
        });
    }

    function handleChange(event) {
        setEditForm({
            ...editForm,
            [event.target.name]: event.target.value
        });
    }

    async function saveEdit(id) {
        try {
            await axios.put(
                `http://localhost:5050/api/restaurants/${id}`,
                editForm
            );

            setEditingId(null);

            reloadData();

            alert("Restoranas atnaujintas");
        } catch (error) {
            console.error(error);

            alert("Klaida atnaujinant restoraną");
        }
    }

    return (
        <div className="card">
            <h2>Restoranų sąrašas</h2>

            {restaurants.map((restaurant) => (
                <div
                    key={restaurant._id}
                    className="restaurant-item"
                >
                    {editingId === restaurant._id ? (

                        <div className="edit-box">
                            <h3>Redaguoti restoraną</h3>

                            <div className="edit-form">

                                <input
                                    type="text"
                                    name="name"
                                    value={editForm.name}
                                    onChange={handleChange}
                                    placeholder="Pavadinimas"
                                />

                                <input
                                    type="text"
                                    name="city"
                                    value={editForm.city}
                                    onChange={handleChange}
                                    placeholder="Miestas"
                                />

                                <input
                                    type="text"
                                    name="cuisine"
                                    value={editForm.cuisine}
                                    onChange={handleChange}
                                    placeholder="Virtuvė"
                                />

                                <input
                                    type="number"
                                    name="rating"
                                    value={editForm.rating}
                                    onChange={handleChange}
                                    placeholder="Įvertinimas"
                                />

                                <input
                                    type="text"
                                    name="dish"
                                    value={editForm.dish}
                                    onChange={handleChange}
                                    placeholder="Patiekalas"
                                />

                                <input
                                    type="text"
                                    name="image"
                                    value={editForm.image}
                                    onChange={handleChange}
                                    placeholder="Nuotrauka, pvz. restoranas1.jpg"
                                />

                                <textarea
                                    name="description"
                                    value={editForm.description}
                                    onChange={handleChange}
                                    placeholder="Restorano aprašymas"
                                ></textarea>

                                <div className="button-group">
                                    <button
                                        onClick={() =>
                                            saveEdit(restaurant._id)
                                        }
                                    >
                                        Išsaugoti
                                    </button>

                                    <button
                                        onClick={() =>
                                            setEditingId(null)
                                        }
                                    >
                                        Atšaukti
                                    </button>
                                </div>
                            </div>
                        </div>

                    ) : (

                        <>
                            <h3>{restaurant.name}</h3>

                            <p>
                                <strong>Miestas:</strong> {restaurant.city}
                            </p>

                            <p>
                                <strong>Virtuvė:</strong> {restaurant.cuisine}
                            </p>

                            <p>
                                <strong>Įvertinimas:</strong> {restaurant.rating}/10
                            </p>

                            <p>
                                <strong>Patiekalas:</strong> {restaurant.dish}
                            </p>

                            {restaurant.image && (
                                <img
                                    src={`http://localhost:5050/img/${restaurant.image}`}
                                    alt={restaurant.name}
                                    style={{
                                        width: "100%",
                                        maxWidth: "350px",
                                        borderRadius: "12px",
                                        marginTop: "15px"
                                    }}
                                />
                            )}

                            <p style={{ marginTop: "15px" }}>
                                {restaurant.description}
                            </p>

                            <div className="button-group">
                                <button
                                    onClick={() =>
                                        startEdit(restaurant)
                                    }
                                >
                                    Redaguoti
                                </button>

                                <button
                                    onClick={() =>
                                        deleteRestaurant(restaurant._id)
                                    }
                                >
                                    Ištrinti
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default RestaurantList;