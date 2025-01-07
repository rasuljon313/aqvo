import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Tokenni o'chirish
    localStorage.removeItem("token");

    // Foydalanuvchini login sahifasiga yo'naltirish
    navigate("/");
  };

  return (
    <>
      <nav className="nav">
        <div className="nav_box">
          <div className="nav_logo" onClick={handleLogout}>
            <AiOutlineLogout />
            <span>Chiqish</span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
