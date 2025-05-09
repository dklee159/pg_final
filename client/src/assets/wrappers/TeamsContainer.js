import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 4rem;
  h4 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .teams {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .teams {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;
export default Wrapper;
