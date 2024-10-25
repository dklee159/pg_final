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
    max-width: 400px;
  }
  .form-label {
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 5px;
  }
  h5 {
    text-align: center;
    font-weight: 500;
    color: var(--grey-200);
  }
  hr {
    background-color: var(--grey-200);
    height: 1px;
    border: 0;
  }
  .btn {
    margin-top: 1rem;
    background-color: var(--primary-1000);
  }
  .btn:hover {
    background-color: var(--primary-700);
  }
`;
export default Wrapper;
