import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { toggleSidebar, clearStore } from "../features/admin/adminSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => dispatch(clearStore("Logged out successfully"))}
          >
            logout
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
