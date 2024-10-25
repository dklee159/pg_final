import React from "react";
import { Logo } from "../components";
import Wrapper from "../assets/wrappers/Submitted";

const SubmitPage = () => {
  return (
    <Wrapper className="full-page">
      <div className="form">
        <Logo />
        <hr />
        <br />
        <div className="box">
          <p className="comment">Your answer has been submitted and time stamped.</p>
          <p className="comment">Please move onto the next quiz.</p>
        </div>
        <br />
      </div>
    </Wrapper>
  );
};

export default SubmitPage;
