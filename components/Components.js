import styled from "styled-components";

export const FieldZone = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  padding: 20px;
  width: 100%;
  margin: 20px;
`;
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.gap || "0px"};
  height: ${(props) => props.height || "auto"};
  min-height: ${(props) => props.minHeight || "auto"};
`;
export const CenteredRow = styled(Row)`
  align-items: center;
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap || "0px"};
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  max-width: 700px;
  padding: 10px;
  margin: auto;
`;
export const Main = styled.main`
  padding-top: 40px;
  padding-bottom: 40px;
`;
export const Spaced = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  gap: ${(props) => props.gap || "10px"};
  padding-bottom: ${(props) => props.paddingBottom || props.gap || "10px"};
`;
export const BigButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 150px;
  border-radius: 4px;
  background-color: #fff;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  border: 2px solid #e8e8e8;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #e8e8e8;
  }
`;
export const Header = styled.div`
  padding-bottom: 20px;
`;
export const Body = styled.div`
  max-width: 1000px;
  width: 80%;
`;
