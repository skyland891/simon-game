import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  text-transform: uppercase;
  cursor: pointer;
  font-size: 20px;
  border: 1px solid white;
  width: 140px;
  height: 40px;
  ${props => {
    if (props.active) {
      return "background-color: white"; 
    }
    else {
      return "background-color: inherit";
    }
  }};
  color: ${props => {
    if (props.active) {
      return "inherit"; 
    }
    else {
      return "white";
    }
  }};
  @media(min-width: 768px) and (max-width: 1024px) {
    font-size: 12px;
    width: 100px;
    height: 36px;
  }
  @media(min-width: 320px) and (max-width: 768px) {
    font-size: 12px;
    width: 100px;
    height: 36px;
  }
`

function ModeButton(props) {
  return (
    <StyledButton modeName= {props.modeName} active= {props.active} onClick={() => {
        props.changeMode(props.modeName);
    }}>{props.modeName}</StyledButton>
  )
}

export default ModeButton