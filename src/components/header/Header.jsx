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
      // const interval = setInterval(() => {
      //   refreshToken(navigate); 
      // }, 120000);

      // return () => clearInterval(interval); 
    }
  }, [token, refreshToken, navigate]);
  const rows = [
    { name: "Un", quantity: 50 },
    { name: "Shakar", quantity: 30 },
  ];
  return (
    <>
      <header>
        <div className="header_header">
          <Sidebar />
          <div className="header_box">
            <Nav/>
            <div className="header_card">
           <h1>Analitika bolimi</h1>
           <div className="header_card_child">
            <ul className="header_wrapper">
              <li className="header_wrapper_item">ummimiy miqdor</li>
              <li className="header_wrapper_item">ummumir tushum</li>
              <li className="header_wrapper_item">ummumiy sotilgan</li>
            </ul>
            <div className="header_card_resurse">
              <h3 className="header_card_resurse_title">Resurs Hisoboti</h3>
              <p className="header_card_resurse_txt">Mahsulotni tanlang</p>
              <p className="header_card_resurse_txt">Mahsulotni moqdorini kiriting</p>
            </div>
            <div className="header_card_accounting">
             <h3 className="header_card_accounting_title">Sarflangan resurslar jadvali</h3>
             <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      marginTop: "20px",
                    }}
                    border="1"
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#f4f4f4" }}>
                        <th style={{ padding: "10px" }}>Resurslar nomi</th>
                        <th style={{ padding: "10px" }}>Resurslar miqdori (kg)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => (
                        <tr key={index}>
                          <td style={{ padding: "10px" }}>{row.name}</td>
                          <td style={{ padding: "10px" }}>{row.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
            </div>
           </div>
            <button onClick={setOpen}>Modalni ochish</button>
            {open && <Modal />}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
