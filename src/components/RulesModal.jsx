import React from 'react'
import styled from 'styled-components'

const Modal = styled.div`
display: ${props => {
  if(props.active) {
    return "flex";
  }
  else {
    return "none";
  }

}};
position: fixed;
min-width: 100vw;
min-height: 100vh;
background-color: rgba(0, 0, 0, 0.5);
z-index: 100000;
flex-direction: row;
justify-content: center;
align-items: center;
`
const Rules = styled.div`
display: block;
background-color: #383838;
max-width: 600px;
height: calc(100vh - 100px);
position: relative;
@media(min-width: 320px) and (max-width: 768px) {
    height: calc(100vh);
}
`

const RulesTitle = styled.h1`
color: white;
font-size: 36px;
text-align: center;
padding-top: 10px;
padding-bottom: 10px;
`

const RulesContent = styled.div`
color: white;
font-size: 24px;
padding: 25px;
max-width: 100%;
word-wrap: break-word;
overflow-y: auto;
max-height: calc(100% - 120px);
`

const CloseBtn = styled.button`
position: relative;
padding: 0;
margin: 0;
background-color: inherit;
border: none;
left: calc(100% - 30px);
bottom: calc(100% - 55px);
width: 20px;
height: 20px;
cursor: pointer;
border-radius: 100%;
::after {
    content: "";
    position: absolute;
    display: block;
    width: 1px;
    height: 20px;
    transform: rotate(45deg);
    background-color: white;
    right: 10px;
    top: 0;
}
::before {
    content: "";
    position: absolute;
    display: block;
    width: 1px;
    height: 20px;
    transform: rotate(-45deg);
    background-color: white;
    right: 10px;
    top: 0;
}
`
const MainRules = styled.span`
display: inline-block;
margin-bottom: 35px;
`

function RulesModal(props) {
  return (
    <Modal active= {props.ruleActive}>
        <Rules>
            <RulesTitle>Rules</RulesTitle>
                <RulesContent>
                    <MainRules>
                        <p>1. Press the START button. Simon will give the first signal. Repeat the signal by pressing the same color lens.</p>
                        <p>2. Simon will duplicate the first signal and add one. Repeat these two signals by pressing the same color lenses, in order.</p>
                        <p>3. Simon will duplicate these first two signals and add one.</p>
                        <p>4. Continue playing as long as you can repeat each sequence of signals correctly.</p>
                    </MainRules>    
                    <p><b>Easy</b> mode: game with original speed.</p>
                    <p><b>Medium</b> mode: game with higher speed.</p>
                    <p><b>High</b> mode: game with higher speed, where previous combination don't repeat.</p>
                    <p><b>Expert</b> mode: game with higher speed, where previous combination repeat, but lens are replaced regularly.</p>
                    <p><b>Impossible</b> mode: game with higher speed, where previous combination don't repeat and lens are replaced regularly</p>
                </RulesContent>
            <CloseBtn onClick={props.closeModal}></CloseBtn>
        </Rules>
    </Modal>
  )
}

export default RulesModal