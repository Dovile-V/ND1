import { useEffect, useState } from "react";
import axios from "axios";

function SuggestionList({ refresh }) {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        loadSuggestions();
    }, [refresh]);

    async function loadSuggestions() {
        try {
            const response = await axios.get(
                "http://localhost:5050/api/suggestions"
            );

            setSuggestions(response.data);
        } catch (error) {
            console.error("Nepavyko gauti pasiūlymų:", error);
        }
    }

    async function deleteSuggestion(id) {
        if (!window.confirm("Ar tikrai nori ištrinti pasiūlymą?")) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:5050/api/suggestions/${id}`
            );

            loadSuggestions();
        } catch (error) {
            console.error("Nepavyko ištrinti pasiūlymo:", error);
        }
    }

    return (
        <div className="card">
            <h2>Lankytojų pasiūlymai</h2>

            {suggestions.length === 0 ? (
                <p>Pasiūlymų dar nėra.</p>
            ) : (
                suggestions.map((suggestion) => (
                    <div
                        key={suggestion._id}
                        className="restaurant-item"
                    >
                        <h3>{suggestion.name}</h3>

                        <p><strong>Miestas:</strong> {suggestion.city}</p>
                        <p><strong>Virtuvė:</strong> {suggestion.cuisine}</p>
                        <p><strong>Patiekalas:</strong> {suggestion.dish}</p>
                        <p><strong>Įvertinimas:</strong> {suggestion.rating}/10</p>
                        <p><strong>Pasiūlė:</strong> {suggestion.userName}</p>
                        <p><strong>Komentaras:</strong> {suggestion.comment}</p>

                        <div className="button-group">
                            <button onClick={() => deleteSuggestion(suggestion._id)}>
                                Ištrinti pasiūlymą
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default SuggestionList;