import styled, { createGlobalStyle } from "styled-components";
import { keyframes } from "styled-components";
import { BeginContainer } from "./components/Location/Location.elements";

const spin = keyframes`
    0% {
    transform: rotate(0deg);
    }

    100% {
    transform: rotate(360deg);
  } 
  
`;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
  }
  .mb{
    margin-bottom: 6px;
  }

  .mb-2{
    margin-bottom: 12px;
  }
  .mb-4{
    margin-bottom: 18px;
  }
  
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  height: 100vh;
  padding: 0 30px;
  padding-top: 60px;

  &.bg-success {
    background: #05cd97;
  }

  &.full-container {
    justify-content: flex-start;
    ${BeginContainer} {
      justify-content: flex-start;
    }
  }
`;

export const Title = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 37px;

  text-align: center;

  color: #0a1b33;
  margin-bottom: 4px;
  margin-top: 0px;
`;

export const TitleLight = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 37px;

  text-align: center;

  color: #0a1b33;
  margin-bottom: 4px;
  margin-top: 0px;
`;

export const Subtitle = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;

  color: #0a1b33;
  margin-bottom: 4px;
  margin-top: 0px;

  &.text-start {
    text-align: start;
  }
`;

export const SubtitleLight = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;

  text-align: center;

  color: #0a1b33;
  margin-bottom: 4px;
  margin-top: 0px;

  &.text-start {
    text-align: start;
  }

  &.bold {
    font-weight: 400;
  }
`;

export const Spinner = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.3);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border-left-color: #fff;

  position: absolute;
  right: 15px;
  top: 15px;
  pointer-events: none;

  animation: ${spin} 1s linear infinite;
`;

export default GlobalStyle;
