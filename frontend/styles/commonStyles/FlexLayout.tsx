import styled from "styled-components";

export const FlexLayout = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  flex-wrap: nowrap;
  height: fit-content;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    gap: 0.5rem;
    margin: 0 1rem 0 0;
    padding: 0 1rem 0 0;
  }

  @media screen and (max-width: 1200px) {
    gap: 1rem;
  }

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    border: none;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 9999px;
    background-color: transparent;
    visibility: hidden;
  }
  &:hover::-webkit-scrollbar-thumb {
    visibility: visible;
  }
`;
