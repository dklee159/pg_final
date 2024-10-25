import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  align-content: center;
  justify-content: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 0rem;
  }
  .form {
    max-width: 50%;
    min-width: 400px;
    font-size: 1.2rem;
    font-weight: 500;
  }
  .form-row {
    font-weight: 300;
  }
  .form-label {
    font-weight: 300;
    text-indent: 2px;
    font-size: 1rem;
    text-transform: none;
  }
  .quiz-label {
    font-weight: 700;
    text-indent: 2px;
    font-size: 1rem;
    text-transform: none;
  }
  p {
    margin-top: 0px;
    max-width: 100%;
    border: 1px solid var(--grey-200);
    padding: 20px;
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
    float: right;
    margin-top: 1rem;
    width: 50%;
    font-weight: 700;
    background-color: var(--primary-1000);
  }
  .btn:hover {
    background-color: var(--primary-700);
  }
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal {
    background: var(--clr-white);
    width: 80vw;
    max-width: 500px;
    border-radius: var(--radius);
    padding: 2rem 1rem;
    text-align: center;
  }
  .modal h4 {
    line-height: 1.5;
    margin-bottom: 0;
    font-weight: 600;
    margin-top: 0;
    text-transform: none;
  }

  .modal .confirm-btn {
    margin-top: 1.5rem;
    font-weight: 700;
    background-color: var(--primary-700);
    height: 50px;
    width: 150px;
    font-size: 1.5em;
  }
  .modal .confirm-btn:hover {
    background-color: var(--primary-1000);
  }
  .modal .clear-btn {
    margin-top: 1.5rem;
    font-weight: 700;
    height: 50px;
    width: 150px;
    font-size: 1.5em;
    background: var(--grey-500);
  }

  .modal .clear-btn:hover {
    background: var(--grey-700);
  }
`;
export default Wrapper;
