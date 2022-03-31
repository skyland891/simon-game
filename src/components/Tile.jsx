import React from 'react'
import styled from 'styled-components'

const StyledTile = styled.div`
position: relative;
cursor: pointer;
height: 200px;
width: 200px;
:nth-child(1) {
  border-top-left-radius: 100%
}
:nth-child(2) {
  border-top-right-radius: 100%;
}
:nth-child(3) {
  border-bottom-left-radius: 100%;
}
:nth-child(4) {
  border-bottom-right-radius: 100%;
}

:nth-child(1)::after {
  right: 0;
  bottom: 0;
  border-top-left-radius: 100%; 
}
:nth-child(2)::after {
  left: 0;
  bottom: 0;
  border-top-right-radius: 100%;
}
:nth-child(3)::after {
  right: 0;
  top: 0;
  border-bottom-left-radius: 100%;
}
:nth-child(4)::after {
  left: 0;
  top: 0;
  border-bottom-right-radius: 100%;
}
${props => {
 if(props.disabled) {
   return "pointer-events: none"
 }
 else {
   return "pointer-events: auto"
 }
}};
background-color: ${props => {
  if(props.flash[props.color]) {
    switch (props.color) {
      case "green":
        return "rgb(125, 255, 125)";
      case "blue":
        return "rgb(125, 125, 255)";  
      case "red":
        return "rgb(255, 125, 125)";
      case "yellow":
        return "rgb(255, 255, 125)";
    }    
  }
  else {
    return props.color;
  }
}};
::after {
  content: "";
  display: block;
  position: absolute;
  min-height: 100px;
  min-width: 100px;
  background-color: #383838;
  @media(min-width: 320px) and (max-width: 768px) {
    min-width: 50px;
    min-height: 50px;
  }
}
:active {
  background-color: ${props => {
    switch (props.color) {
      case "green":
        return "rgb(125, 255, 125)";
      case "blue":
        return "rgb(125, 125, 255)";
      case "red":
        return "rgb(255, 125, 125)";
      case "yellow":
        return "rgb(255, 255, 125)";
    }}
  }};
}
@media(min-width: 320px) and (max-width: 768px) {
  height: 120px;
  width: 120px;

}
`

const Tile = React.forwardRef((props, ref) => {
 return(
   <StyledTile ref= {ref} disabled= {props.disabled} flash= {props.flash} color={props.color} onClick={() => {
     props.clickFunction({color: props.color, id: props["data-key"]});
   }}>
  </StyledTile>
 )
});

export default Tile