export default function Login({ onLogin }) {

    const handleSubmit = (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        if (username === "admin" && password === "1234") {
            onLogin();
        } else {
            alert("Neteisingi prisijungimo duomenys");
        }
    };

    return (
        <div className="form-section">

            <h2>Admin prisijungimas</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="username"
                    placeholder="Vartotojas"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Slaptažodis"
                    required
                />

                <button type="submit">
                    Prisijungti
                </button>

            </form>

        </div>
    );
}