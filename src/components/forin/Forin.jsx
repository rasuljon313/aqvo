import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Forin = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  // Redirect if the user is already logged in
  useEffect(() => {
    if (token) {
      navigate("/home"); // Redirect to home if token exists
    }
  }, [token, navigate]);

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const payload = {
      phoneNumber: number,
      password: password,
    };

    fetch("https://aqvo.limsa.uz/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Server response:", data);
        const accessToken = data?.data?.tokens?.access_token;

        if (accessToken) {
          localStorage.setItem("token", accessToken);
          setToken(accessToken); // Store token in state
          setSuccessMessage("Login successful!");
          navigate("/home"); // Navigate to home after successful login
          console.log("Login successful");
        } else {
          throw new Error(data.message || "Login failed");
        }
      })
      .catch((err) => {
        console.error("Error during login:", err);
        setErrorMessage(err.message || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="auth-app">
        <div className="container">
          <div className="auth-box">
            <form className="auth-card" onSubmit={login}>
              <input
                className="auth-input"
                type="tel"
                placeholder="Phone Number"
                required
                onChange={(e) => setNumber(e.target.value)}
                value={number}
              />
              <input
                className="auth-input"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button className="auth-btn" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forin;
