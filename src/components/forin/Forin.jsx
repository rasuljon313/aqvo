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

  // Agar token mavjud bo'lsa, home sahifasiga o'tish
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  const login = (e) => {
    e.preventDefault();
    if (token) return; // Agar token bo'lsa, loginni oldini olish
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const payload = {
      phoneNumber: number,
      password: password,
    };

    // Login qilish uchun so'rov yuborish
    fetch("https://aqvo.limsa.uz/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Serverdan xatolik: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Server javobi:", data);
        const accessToken = data?.data?.tokens?.access_token;

        // Agar token bo'lsa, saqlash va home sahifasiga yo'naltirish
        if (accessToken) {
          localStorage.setItem("token", accessToken);  // Tokenni saqlash
          setToken(accessToken);
          setSuccessMessage("Kirish muvaffaqiyatli!");
          navigate("/home"); // Home sahifasiga o'tish
        } else {
          throw new Error(data.message || "Kirishda xatolik");
        }
      })
      .catch((err) => {
        console.error("Login xatosi:", err);
        setErrorMessage(err.message || "Nimadir noto'g'ri ketdi");
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
                placeholder="Telefon raqam"
                required
                onChange={(e) => setNumber(e.target.value)}
                value={number}
              />
              <input
                className="auth-input"
                type="password"
                placeholder="Parol"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button className="auth-btn" type="submit" disabled={loading}>
                {loading ? "Kirib boryapti..." : "Kirish"}
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
