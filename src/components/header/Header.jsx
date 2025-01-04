import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand"; 
import Modal from "./Modal";
import Sidebar from "../sidebar/SideBar";

const Header = () => {
  const navigate = useNavigate();
  const { open, setOpen } = useStore();  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <>
    <Sidebar/>
      <div className="container">Header Content</div>
      <button onClick={setOpen}>Toggle Modal</button> 
      {
        open && <Modal /> 
      }
    </>
  );
};

export default Header;
