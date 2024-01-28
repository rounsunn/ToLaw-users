import { FaHome, FaSearch, FaMicrophone, FaFile } from "react-icons/fa";
import { Link } from "react-router-dom";


const HomeBar = () => {
  return (
    <div className="fixed bottom-0 left-0 bg-[#0C253F] text-white flex w-full p-6 justify-evenly">
        <Link to={"/"} className="text-decoration-none">
            <FaHome className="d-inline-block align-center w-8 h-8"/>
        </Link>
        <Link to={"/search"} className="text-decoration-none">
            <FaSearch className="d-inline-block align-center w-8 h-8"/>
        </Link>
        <Link to={"/aiassist"} className="text-decoration-none">
            <FaMicrophone className="d-inline-block align-center w-8 h-8"/>
        </Link>
        <Link to={"/templates"} className="text-decoration-none">
            <FaFile className="d-inline-block align-center w-8 h-8"/>
        </Link>
    </div>
  )
}

export default HomeBar