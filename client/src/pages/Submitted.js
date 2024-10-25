import React from "react";
import { Logo } from "../components";
import Wrapper from "../assets/wrappers/Submitted";

const Submitted = () => {
  return (
    <Wrapper className="full-page">
      <div className="form">
        <Logo />
        <hr />
        <br />
        <div className="box">
          <p className="comment submitted">Your team already submitted an answer.</p>
          <p className="comment submitted">Please close this window and proceed to the next quiz.</p>
        </div>
        <br />
      </div>
    </Wrapper>
  );
};

export default Submitted;
