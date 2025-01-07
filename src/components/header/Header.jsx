import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand";
import Modal from "./Modal";
import Sidebar from "../sidebar/SideBar";
import Nav from "../nav/Nav";

const Header = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [takeID, setTakeiD] = useState(null)
  const [dataConserve, setDateConserve] = useState(null);
  const { token, refreshToken, setOpen, open } = useStore();

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      if (window.location.pathname !== "/home") {
        navigate("/home")
        // const interval = setInterval(() => {
        //       //   refreshToken(navigate);
        //       // }, 120000);

        //       // return () => clearInterval(interval);
      }
    }
  }, [token, refreshToken, navigate]);

  useEffect(() => {
    fetch("https://aqvo.limsa.uz/api/analytics", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setData(data)) // Directly set the fetched data
      .catch((error) => {
        console.error("Error fetching analytics data:", error);
      });
  }, []);

  useEffect(() => {
    fetch("https://aqvo.limsa.uz/api/conserve-type", {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((elem) => setDateConserve(elem.data))
      .catch((error) => {
        console.error("Error fetching analytics data:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = [
    { name: "Un", quantity: 50 },
    { name: "Shakar", quantity: 30 },
  ];
  console.log(dataConserve);

  const select = (event) => {
    console.log(event.target.value)
    
    const selectID = event.target.value;
    selectID?.map((i)=>(
      console.log(i)
    ))
    setTakeiD(selectID);  
  };
  // console.log(takeID);


  return (
    <>
      <header>
        <div className="header_header">
          <Sidebar />
          <div className="header_box">
            <Nav />
            <div className="header_card">
              <h1>Analitika bolimi</h1>
              <div className="header_card_child">
                <ul className="header_wrapper">
                  <li className="header_wrapper_item">
                    📈
                    ummimiy miqdor {data?.totalProduced}
                  </li>
                  <li className="header_wrapper_item">
                    🛒
                    ummumir tushum {data?.totalProfit}
                  </li>
                  <li className="header_wrapper_item">
                    💰
                    ummumiy sotilgan {data?.totalSold}
                  </li>
                </ul>
                <div className="header_card_resurse">
                  <h3 className="header_card_resurse_title">Resurs Hisoboti</h3>
                  <select name="" id="" onChange={select}>
                    <option value="" selected disabled>
                      mahsulotni tanlang
                    </option>
                    {dataConserve &&
                      dataConserve.map((option) => (

                          console.log(option?.productConsumptions)
                          

                        // <option key={index} value={option.productConsumptions || index}>
                        //   {option.conserveType || option}
                        // </option>
                      ))}
                  </select>
                </div>
                <div className="header_card_accounting">
                  <h3 className="header_card_accounting_title">
                    Sarflangan resurslar jadvali
                  </h3>
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
                        <th style={{ padding: "10px" }}>
                          Resurslar miqdori (kg)
                        </th>
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
