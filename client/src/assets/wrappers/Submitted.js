import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 0rem;
  }
  .form {
    max-width: 50%;
    min-width: 400px;
    font-size: 1.2rem;
  }

  .box {
    max-width: 95%;
    margin: auto;
    padding: 15px;
    text-align: center;
    font-weight: 700;
    border: 1px solid var(--grey-200);
  }
  .comment {
    border: 0px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .submitted {
    color: var(--red-mid);
  }
  h4 {
    font-size: 1.25rem;
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: 700;
  }
  hr {
    background-color: var(--grey-200);
    margin-bottom: 10px;
    height: 1px;
    border: 0;
  }
  .btn {
    display: block;
    margin: auto;
    width: 50%;
    height: 50px;
    font-weight: 700;
    background-color: var(--grey-1000);
  }
  .btn:hover {
    background-color: var(--grey-700);
  }
`;
export default Wrapper;
