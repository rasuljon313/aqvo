import { AiOutlineLogout } from "react-icons/ai"

const Nav = () => {
  return (
    <>
   <nav className="nav">
    <div className="container">
        <div className="nav_box">
            <div className="nav_logo">
            <AiOutlineLogout />
            <span>Chiqish</span>
            </div>
        </div>
    </div>
   </nav>
    </>
  )
}

export default Nav