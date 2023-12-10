import styled from "styled-components";

export const CardAnchor = styled.div`
  text-decoration: none;
  color: rgb(204, 204, 204);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  text-decoration: none;
  color: rgb(204, 204, 204);
  width: 200px;
  height: 400px;

  &:hover {
    color: #fff;
  }
`;

export const CardImage = styled.img`
  width: 200px;
  transition: filter 0.3s ease;

  &:hover {
    filter: grayscale(100%);
  }
`;

export const InfoPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px;
`;

export const DiscPerc = styled.div`
  background-color: rgb(0, 116, 228);
  padding: 8px;
  border-radius: 10px;
`;

 export const Price = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const OldPrice = styled.div`
  text-decoration: line-through;
`;
