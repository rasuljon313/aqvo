import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/SideBar";

const Emploees = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
        } else {
          navigate("/employees");
        }
      }, [navigate]);
  return (
    <>
    <Sidebar/>
     <div>Ishchilar</div>
    </>
  )
}

export default Emploees