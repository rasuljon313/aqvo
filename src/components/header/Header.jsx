import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand"; // Zustand store fayliga yo'lni to'g'rilang
import Modal from "./Modal";
import Sidebar from "../sidebar/SideBar";

const Header = () => {
  const navigate = useNavigate();
  const { token, refreshToken, setOpen, open } = useStore();

  useEffect(() => {
    if (!token) {
      navigate("/"); 
    } else {
      navigate("/home")
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
            <button onClick={setOpen}>Toggle Modawxdgit clwfgit wefxwef</button>
            {open && <Modal />}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
