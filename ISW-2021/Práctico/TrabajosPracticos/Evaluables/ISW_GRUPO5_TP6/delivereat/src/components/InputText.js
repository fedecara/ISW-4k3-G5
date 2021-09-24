import React, { useEffect } from "react";
import styled from "styled-components";
import { LocationInput } from "./Location/Location.elements";

const LabelInput = styled.div`
  display: flex;
  justify-content: flex-start;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 15px;
  /* margin-bottom: 8px; */

  color: #000000;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  &.input-group:first-child {
    margin-right: 14px;
  }
`;

const InputText = (props) => {
  const { mask, name, value, onChange, label, placeholder, clase, error } =
    props;
  useEffect(() => {
    return () => {
      console.log(clase);
    };
  }, [placeholder]);
  return (
    <>
      <InputContainer className={clase}>
        {label !== null && <LabelInput>{label}</LabelInput>}
        <LocationInput
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={error && "error"}
          mask={mask}
        ></LocationInput>
      </InputContainer>
    </>
  );
};

export default InputText;
