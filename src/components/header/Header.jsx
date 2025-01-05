import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand"; 
import Modal from "./Modal";
import Sidebar from "../sidebar/SideBar";
import Nav from "../nav/Nav";

const Header = () => {
  const navigate = useNavigate();
  const { token, refreshToken, setOpen, open } = useStore();

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      if (window.location.pathname !== "/home") {
        navigate("/home");
      }
      const interval = setInterval(() => {
        refreshToken(navigate); 
      }, 120000);

      return () => clearInterval(interval); 
    }
  }, [token, refreshToken, navigate]);

  return (
    <>
      <header>
        <div className="header_header">
          <Sidebar />
          <div className="header_box">
            <Nav/>
            <button onClick={setOpen}>Modalni ochish</button>
            {open && <Modal />}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
