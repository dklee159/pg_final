import { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/LandingPage";
import { FormRow, FormRowSelect, Logo } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginPlayer, registerPlayer } from "../features/player/playerSlice";

const initialState = {
  team: "",
  password: "",
  quizNum: "",
  isMember: true,
  teamOptions: [
    "A"
  ],
};

const Landing = () => {
  const [values, setValues] = useState(initialState);
  const { player, isLoading } = useSelector((store) => store.player);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quizNum } = useParams();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { team, password, isMember } = values;
    if (!team || !password) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isMember) {
      dispatch(loginPlayer({ team: team, password: password }));
      return;
    }
    dispatch(registerPlayer({ team, password }));
  };
  useEffect(() => {
    if (player && player.team) {
      setTimeout(() => {
        navigate(`/quizNum/${quizNum}`);
        console.log(`${player} logged in`);
      }, 1000);
    }
  }, [player]);
  return (
    <Wrapper className="full-page bg">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <hr />
        <h5>Login</h5>
        {/* team field */}
        <FormRow type="team" name="team" value={values.team} handleChange={handleChange} />
        {/* <FormRowSelect name="team" value={values.team} handleChange={handleChange} list={["", ...values.teamOptions]} /> */}
        {/* password field */}
        <FormRow type="password" name="password" value={values.password} handleChange={handleChange} labelText="Password (Team Code)" />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Landing;
