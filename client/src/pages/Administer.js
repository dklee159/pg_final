import { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/AdminPage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, registerAdmin } from "../features/admin/adminSlice";

import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

function Administer() {
  const [values, setValues] = useState(initialState);
  const { admin, isLoading } = useSelector((store) => store.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isMember) {
      dispatch(loginAdmin({ email: email, password: password }));
      return;
    }
    dispatch(registerAdmin({ name, email, password }));
  };

  useEffect(() => {
    if (admin) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [admin]);
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <hr />
        <h5>Login</h5>
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
      </form>
    </Wrapper>
  );
}
export default Administer;
