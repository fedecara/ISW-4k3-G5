import styled from "styled-components";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxOption,
} from "@reach/combobox";
import DateTimePicker from "react-datetime-picker";
import InputMask from "react-input-mask";

export const LocationContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  align-self: flex-end;
  width: 100%;
  margin-top: 30px;
`;

export const Card = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  padding: 20px;
  background: #f5f7f9;
  border-radius: 12px;
  margin-top: 30px;
  border: 2px solid transparent;
  transition: all ease 0.5s;

  &:focus {
    border: 2px solid #f67538;
  }
`;

export const CardGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CardIcon = styled.img`
  width: 35px;
  height: 35px;

  margin-bottom: 16px;
`;

export const CardTitle = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #0a1b33;

  margin-bottom: 16px;
`;

export const CardSubTitle = styled.div`
  text-align: start;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
  color: #0a1b33;

  margin-bottom: 16px;
`;

export const CardCheckIcon = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #6e7279;
  margin-right: 12px;
  background-color: transparent;
  border-radius: 100%;
`;

export const InputGroupIcon = styled.img`
  width: 45px;
  height: 32px;
`;

export const CardSeparator = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(10, 27, 51, 0.15);
  margin-bottom: 8px;
`;

export const CardBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 14px 14px;
  background: #f5f7f9;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: all ease 0.3s;

  &:first-of-type {
    margin-top: 12px;
  }

  &:last-of-type {
    margin-bottom: 12px;
  }

  &.has-icon {
    padding: 4px 14px;
  }

  margin-bottom: 14px;

  ${CardTitle} {
    margin-bottom: 0;
  }

  ${CardIcon} {
    margin-bottom: 0;
    width: 45px;
    height: 45px;
    margin-right: 8px;
  }

  &.outlined {
    background: #ffffff;
    border: 1px solid rgba(10, 27, 51, 0.35);
    border-radius: 22px;
    padding: 14px 22px;

    ${CardTitle} {
      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 20px;
      color: #0a1b33;

      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    ${CardSubTitle} {
      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;
      color: rgba(10, 27, 51, 0.55);
      margin-bottom: 0;
    }

    ${CardIcon} {
      width: 25px;
      height: 25px;

      margin-right: 12px;
      &.sm {
        width: 20px;
        height: 20px;
      }
    }
  }

  &.detail {
    background: #f5f7f9;
    border-radius: 22px;
    padding: 18px 22px;
    flex-direction: column;
    margin-top: 12px;

    ${CardGroup} {
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 8px;
    }

    ${CardGroup}:last-child {
      margin-bottom: 0;
    }

    ${CardSubTitle} {
      font-weight: 300;
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 0;
    }

    ${CardTitle} {
      font-weight: normal;
      font-size: 16px;
      line-height: 20px;
    }
  }

  &.selected {
    border: 1px solid #f67538;

    & > ${CardCheckIcon} {
      transition: all ease 0.3s;
      background-color: #f67538;
      border: 1px solid #f67538;
      display: flex;
      justify-content: center;
      align-items: center;
      &::before {
        width: 8px;
        height: 8px;
        border-radius: 100%;
        background-color: #fff;
      }
    }
  }
`;

export const BeginContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  ${ButtonContainer} {
    margin-top: auto;
    margin-bottom: 30px;
  }
  ${CardBox}:first-child {
    margin-top: 30px;
  }
`;

export const SearchIcon = styled.img`
  margin-bottom: 25px;
`;

export const SearchContainer = styled(Combobox)`
  margin-top: 22px;
  display: flex;
  width: 100%;
`;

export const LabelInput = styled.label`
  display: flex;
  width: 100%;
  padding: 16px 10px;
  border-radius: 8px;
  border: 1px solid #f0f0f2;
  margin-bottom: 14px;
  transition: all ease 0.2s;

  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 15px;

  color: #6e7279;

  & > input {
    display: none;
    visibility: hidden;
  }

  &:focus {
    border: 1px solid #f67538;
    outline: none;
  }
`;

export const LocationInput = styled(InputMask)`
  display: flex;
  width: 100%;
  padding: 14px 10px;
  border-radius: 8px;
  border: 1px solid #f0f0f2;
  margin-bottom: 14px;
  transition: all ease 0.2s;

  &.input-group {
    margin-bottom: 0;

    &:first-child {
      margin-right: 14px;
    }
  }

  &:focus {
    border: 1px solid #f67538;
    outline: none;
  }

  &::placeholder {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 15px;

    color: #6e7279;
  }

  &.error {
    border: 1px solid #d11f62;
  }

  //Fuente
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;

  color: #0a1b33;
`;

export const ErrorTag = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #d11f62;
  display: flex;
  justify-content: start;
  width: 100%;
  margin-top: -12px;
`;

export const CheckBoxLabel = styled.label`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 15px;

  margin-top: 14px;

  color: #6e7279;
`;

export const DateInput = styled(DateTimePicker)`
  width: 100%;
  & > .react-datetime-picker {
    width: 100%;
    &__wrapper {
      display: flex;
      width: 100%;
      padding: 14px 10px;
      border-radius: 8px;
      border: 1px solid #f0f0f2;
      transition: all ease 0.3s;
      &:focus,
      &:hover {
        border: 1px solid #f67538;
      }
    }
    &__calendar {
      & > .react-calendar {
        &__tile {
          &--hasActive {
            background-color: #f67538;
          }
        }
      }
    }
  }
`;

export const InputIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  margin-bottom: 14px;

  &.icon-group {
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0;

    ${InputGroupIcon} {
      margin-left: 14px;
    }
  }

  &.icon {
    position: relative;
    width: 100%;
    margin-bottom: 0;

    &.icon > ${InputIcon} {
      position: absolute;
      right: 15px;
      top: 15px;
      pointer-events: none;
    }
  }
`;

export const InputSearch = styled(ComboboxInput)`
  display: flex;
  width: 100%;
  padding: 14px 10px;
  border-radius: 8px;
  border: 1px solid #f0f0f2;
  margin-bottom: 14px;

  &:focus {
    border: 1px solid #f67538;
    outline: none;
  }

  &::placeholder {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 15px;

    color: #6e7279;
  }

  //Fuente
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;

  color: #0a1b33;

  &.error {
    border: 1px solid #d11f62;
  }
`;

export const NextButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f67538;
  border-radius: 8px;
  color: #fff;
  padding: 14px 10px;
`;

export const SearchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 14px 10px;
  border-radius: 8px;
  background: #f67538;

  //Fuente
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;

  color: #f9f6f4;

  &.btn-white {
    background: #fff;
    color: #05cd97;

    font-size: 18px;
  }
`;

export const SearchPopOver = styled(ComboboxPopover)`
  background: #fff;
  /* border: 1px solid #0a1b33; */
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

export const SearchOption = styled(ComboboxOption)`
  background: #fff;
  margin: 0 10px;
  padding: 10px;
  border-bottom: 1px solid #f0f0f2;
  //Fuente
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */

  color: #0a1b33;
`;

export const GoBack = styled.img`
  position: absolute;
  width: 25px;
  height: 25px;
  top: 3%;
  left: 5%;
  z-index: 10;
`;

export const MapButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0 18px;
  padding: 14px 10px;
  border-radius: 8px;
  background: #f67538;

  //Fuente
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;

  color: #f9f6f4;
  position: absolute;
  bottom: 10%;
  left: 0;
  right: 0;
  z-index: 10;
`;

//Estilos para confirmacion de pago
export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  height: 100%;
`;

export const SuccessIcon = styled.img`
  margin-top: 60px;
  margin-bottom: 60px;
  width: 140px;
  height: 140px;
`;

export const SuccessTitle = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 34px;
  text-align: center;
  color: #ffffff;

  margin-bottom: 20px;
`;

export const SuccessSubtitle = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
`;
