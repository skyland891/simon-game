import React, {useState} from "react"
import Tile from "./components/Tile"
import styled from 'styled-components'
import timeout from "./utils/util"
import ModeButton from "./components/ModeButton"
import gitLogo64 from "./img/GitHub-Mark-Light-64px.png"
import gitLogo32 from "./img/GitHub-Mark-Light-32px.png"
import rulesImg64 from "./img/rules-64px.png"
import rulesImg32 from "./img/rules-32px.png"
import RulesModal from "./components/RulesModal"
import redAudioUrl from "./audio/simonSound1.mp3"
import yellowAudioUrl from "./audio/simonSound2.mp3"
import greenAudioUrl from "./audio/simonSound3.mp3"
import blueAudioUrl from "./audio/simonSound4.mp3"
import errorAudioUrl from "./audio/error.wav"

const Header = styled.header`
display: flex;
flex-direction: row;
justify-content: space-between;
background-color: #383838;
padding: 10px 40px 0 40px;
@media(min-width: 320px) and (max-width: 768px) {
  padding: 10px 20px 0 20px;
}
`
const RulesBtn = styled.span`
position: relative;
background-image: url("${rulesImg64}");
background-repeat: no-repeat;
width: 64px;
height: 64px;
background-position: center;
cursor: pointer;
@media(min-width: 320px) and (max-width: 768px) {
  background-image: url("${rulesImg32}");
  width: 32px;
  height: 32px;
  padding: 0 20px;
}
::after {
  content: "Rules";
  position: absolute;
  display: inline-block;
  background-color: rgba(0,0,0,0.0);
  opacity: 0;
  color: white;
  min-width: 50px;
  min-height: 30px;
  bottom: 0px;
  left: 0px;
  text-align: center;
  padding-top: 5px;
  border-radius: 10px;
  transition: all .3s;
}
:hover::after {
  opacity: 1;
  bottom: -35px;
  background-color: rgba(0,0,0,0.7);
}
`

const TileGroup = styled.div`
display: grid;
grid-template-rows: 1fr 1fr;
grid-template-columns: 1fr 100%;
`
const Simon = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
min-height: 100vh;
background-color: #383838;
`

const PointsWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
padding-top: 2rem;
padding-bottom: 2rem;
@media(min-width: 320px) and (max-width: 768px) {
  padding-bottom: 10rem;
}
`

const PointTracker = styled.span`
font-size: 40px;
color: #F7F7F7;
@media(min-width: 768px) and (max-width: 1024px) {
  font-size: 30px;
}
@media(min-width: 320px) and (max-width: 768px) {
  font-size: 25px;
}
`
const GameField = styled.div`
position: relative;
display: flex;
justify-content: center;
`

const StartButton = styled.button`
position: absolute;
cursor: pointer;
top: calc(50% - 100px);
left: calc(50% - 100px);
z-index: 100;
border-radius: 100%;
min-width: 200px;
min-height: 200px;
font-size: 40px;
text-transform: uppercase;
background-color: #383838;
border: 0 solid;
box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
outline: 1px solid;
outline-color: rgba(255, 255, 255, .5);
outline-offset: 0px;
text-shadow: none;
transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
:hover {
  border: 1px solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2);
  outline-color: rgba(255, 255, 255, 0);
  outline-offset: 15px;
  text-shadow: 1px 1px 2px #427388; 
}
:active {
  border: 0 solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
  outline: 1px solid;
  outline-color: rgba(255, 255, 255, .5);
  outline-offset: 0px;
  text-shadow: none;
}
@media(min-width: 320px) and (max-width: 768px) {
  min-width: 100px;
  min-height: 100px;
  font-size: 20px;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
}
color: #F7F7F7;
`
const ModeGroup = styled.div`
position: absolute;
right: 80px;
top: 80px;
display: flex;
flex-direction: column;
flex-wrap: wrap;
max-width: 470px;
justify-content: center;
gap: 0.5rem;
@media(min-width: 768px) and (max-width: 1024px) {
  gap: 0.3rem;
  top: 100px;
  right: 60px;
}
@media(min-width: 320px) and (max-width: 768px) {
  flex-direction: row;
  gap: 0.2rem;
  width: 220px;
  top: -130px;
  right: 50%;
  margin-right: -110px;
}
`

const Github = styled.a`
position: relative;
background-image: url(${gitLogo64});
background-repeat: no-repeat;
background-position: center;
height: 64px;
width: 64px;
@media(min-width: 320px) and (max-width: 768px) {
  background-image: url(${gitLogo32});
  height: 32px;
  width: 32px;
}
::after {
  content: "My GitHub";
  position: absolute;
  display: inline-block;
  background-color: rgba(0,0,0,0.0);
  opacity: 0;
  color: white;
  min-width: 80px;
  min-height: 30px;
  bottom: 0;
  left: 0px;
  text-align: center;
  padding-top: 5px;
  border-radius: 10px;
  transition: all .25s;
}
:hover::after {
  opacity: 1;
  bottom: -40px;
  background-color: rgba(0,0,0,0.7);
}
`

function App() {
  const modeList = [
    {
      name: "easy",
      speed: 500,
      replace: false,
      onlyLast: false,
      id: 1
    },
    {
      name: "medium",
      speed: 200,
      replace: false,
      onlyLast: false,
      id: 2,
    },
    {
      name: "hard",
      speed: 500,
      replace: false,
      onlyLast: true,
      id: 3,
    },
    {
      name: "expert",
      speed: 500,
      replace: true,
      onlyLast: false,
      id: 4,
    },
    {
      name: "impossible",
      speed: 500,
      replace: true,
      onlyLast: true,
      id: 5,
    },
  ];

  const initialColorArray = [
    {
      color: "red",
      id: 1,
    },
    {
      color: "green",
      id: 2,
    },
    {
      color: "blue",
      id: 3,
    },
    {
      color: "yellow",
      id: 4,
    },
  ];

  const AudioLibrary = {
    red: new Audio(redAudioUrl),
    yellow: new Audio(yellowAudioUrl),
    green: new Audio(greenAudioUrl),
    blue: new Audio(blueAudioUrl),
    error: new Audio(errorAudioUrl),
  }

  const initialActive = {
    easy: true,
    medium: false,
    hard: false,
    expert: false,
    impossible: false,
  };
  // States
  const [originalCombo, setOriginalCombo] = useState([]);
  const [inputCombo, setInputCombo] = useState([]);
  const [points, setPoints] = useState(0);
  const [flash, setFlash] = useState({
    red: false,
    yellow: false,
    blue: false,
    green: false,
  });
  const [isDisabled, setDisabled] = useState(false);
  const [isActive, setActive] = useState({...initialActive});
  const [mode, setMode] = useState(modeList[0]);
  const [colorArray, setColorArray] = useState([...initialColorArray]);
  const [ruleActive, setRuleActive] = useState(true);

  //Functions
  function startGame() {
    let initialColor = colorArray[Math.floor(Math.random() * 4)];
    setOriginalCombo([initialColor]);
    flashColors([initialColor], mode);
    setInputCombo([]);
    setPoints(0);
  }

  function shuffle(array) {
    let originalLength = array.length;
    const newArray = [];
    let randomIndex;
    for (let i = 0; i < originalLength; i++) {
      randomIndex = Math.floor(Math.random() * array.length);
      newArray.push(array[randomIndex]);
      array.splice(randomIndex, 1);
    }
    return newArray;
}

  function compareCombinations(original, input) {
    let compareFlag = true;
    input.forEach((element, index) => {
      if(!(element.color === original[index].color)){
        compareFlag = false;
      }
    });
    return compareFlag;
  }

  async function flashColors(colors, mode) {
    setDisabled(true);
    if(mode.onlyLast) {
      await timeout(mode.speed);
      setFlash(prevState => ({
        ...prevState,
        [colors[colors.length - 1].color]: true,
      }));
      playAudio(colors[colors.length - 1]);
      await timeout(mode.speed);
      setFlash(prevState => ({
        ...prevState,
        [colors[colors.length - 1].color]: false,
      }));
    }
    else {
      for(let color of colors) {
        await timeout(mode.speed);
        setFlash(prevState => ({
          ...prevState,
          [color.color]: true,
        }));
        playAudio(color);
        await timeout(mode.speed);
        setFlash(prevState => ({
          ...prevState,
          [color.color]: false,
        }));
      }
    }
    await timeout(mode.speed);
    setDisabled(false);
  }

  function playAudio(color) {
    if(color) {
      AudioLibrary[color.color].playbackRate = 2.0;
      if(mode.name === "medium") {
        AudioLibrary[color.color].playbackRate = 3.6;
      }
      AudioLibrary[color.color].play();
    }
    else {
      console.log("error");
      AudioLibrary["error"].play();
    }
  }

  function toggleRulesModal(active) {
    setRuleActive(active);
  }

  function handleChangeMode(modeName) {
    const activeMode = {...initialActive};
    for(let mode in activeMode) {
      if(mode === modeName) {
        activeMode[mode] = true;
      }
      else {
        activeMode[mode] = false;
      }
    }
    setActive(activeMode);
    setInputCombo([]);
    setOriginalCombo([]);
    for (let mode of modeList) {
      if(mode.name === modeName){
        setMode(mode);
      }
    }
  }

  function addCombinationItem(color) {
    const newInput =  [...inputCombo, color];  
    
    if(compareCombinations(originalCombo, newInput)){
      playAudio(color);
      if(originalCombo.length === newInput.length) {
        const newOriginal = [...originalCombo, colorArray[Math.floor(Math.random() * 4)]];
        if(mode.replace && newOriginal.length % 3 === 0){
          setColorArray(shuffle([...colorArray]));
        }
        setOriginalCombo(newOriginal);
        setInputCombo([]);
        setPoints(points + 1);
        flashColors(newOriginal, mode);
      }
      else {
        setInputCombo(newInput);
      }
    }
    else {
      setPoints(0);
      setOriginalCombo([]);
      setInputCombo([]);
      playAudio(null);
    }
  }

  return( 
    <div>
      <RulesModal closeModal= {() => {toggleRulesModal(false)}} ruleActive= {ruleActive}/>
      <Header>
        <Github href="https://github.com/skyland891/simon-game" target="_blank"></Github>
        <RulesBtn onClick= {() => {toggleRulesModal(true)}}></RulesBtn>
      </Header>  
      <Simon>
        <PointsWrapper>
          <PointTracker>Points: {points}</PointTracker>
        </PointsWrapper>
        <GameField>
          <StartButton onClick={startGame}>Start</StartButton>
          <TileGroup>
            {
              colorArray.map(color => <Tile key= {color.id} data-key= {color.id} disabled= {isDisabled} color= {color.color} flash= {flash} clickFunction = {addCombinationItem}/>)
            }
          </TileGroup>
          <ModeGroup>
            {
              modeList.map(mode => <ModeButton key= {mode.id} active= {isActive[mode.name]} modeName= {mode.name} changeMode= {handleChangeMode}/>)
            }
          </ModeGroup>
        </GameField>
      </Simon>
    </div>

  )
}

export default App;