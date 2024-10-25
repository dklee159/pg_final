import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

const Denied = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>Denied Access</h3>
        <p>Your way to access the page is denied. Please try again</p>
      </div>
    </Wrapper>
  );
};
export default Denied;
