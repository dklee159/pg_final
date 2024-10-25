import styled from 'styled-components';

const Wrapper = styled.article`
  padding: 2rem;
  background: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${(props) => props.color};
  .parent {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    font-size: 1.25rem;
  }
  .name {
    color: ${(props) => props.color};
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .scored {
  }
  hr {
    background-color: var(--grey-200);
    height: 1px;
    border: 0;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-weight: 700;
    font-size: 20px;
    color: var(--grey-700);
  }
  .correct {
    display: block;
    color: var(--green-mid);
    font-weight: 700;
    font-size: 20px;
  }

  .wrong {
    display: block;
    color: var(--red-mid);
    font-weight: 700;
    font-size: 20px;
  }
`;

export default Wrapper;
