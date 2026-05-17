import { useState } from "react";

import RestaurantForm from "./components/RestaurantForm";
import RestaurantList from "./components/RestaurantList";
import SuggestionList from "./components/SuggestionList";
import Login from "./components/Login";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("adminLoggedIn") === "true"
    );

    const [refresh, setRefresh] = useState(false);

    function handleLogin() {
        localStorage.setItem("adminLoggedIn", "true");
        setIsLoggedIn(true);
    }

    function handleLogout() {
        localStorage.removeItem("adminLoggedIn");
        setIsLoggedIn(false);
    }

    function reloadData() {
        setRefresh(!refresh);
    }

    return (
        <>
            <header className="admin-header">
                <h1>Skonio gidas ADMIN</h1>
                <p>Restoranų ir lankytojų pasiūlymų valdymo sistema.</p>

                {isLoggedIn && (
                    <button onClick={handleLogout}>
                        Atsijungti
                    </button>
                )}
            </header>

            <div className="container">
                {!isLoggedIn ? (
                    <Login onLogin={handleLogin} />
                ) : (
                    <>
                        <RestaurantForm reloadData={reloadData} />

                        <RestaurantList
                            refresh={refresh}
                            reloadData={reloadData}
                        />

                        <SuggestionList refresh={refresh} />
                    </>
                )}
            </div>
        </>
    );
}

export default App;