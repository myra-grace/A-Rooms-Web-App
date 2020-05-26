import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import firebase from "firebase";
import TeleDrawing from "../../components/TeleDrawing";
import TeleWord from "../../components/TeleWord";
import { storeInputDAS } from "../../actions";

//---------------------------------------------------------------------------------
const CANVAS_SIZE = [450, 450];

const DrawStory = () => {
  const database = firebase.database();
  const roomsRef = database.ref("rooms");
  const [divBgone, setDivBgone] = useState(false);
  const [willPlay, setWillPlay] = useState(false);
  const [playersArray, setPlayersArray] = useState([]);
  const [arrPosition, setArrPosition] = useState(0);
  const [bookHolder, setBookHolder] = useState(0);
  const [counter, setCounter] = useState(0);
  const [clear, setClear] = useState(false);
  const [dbURL, setDbURL] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const dispatch = useDispatch();
  const canvasRef = useRef();

  const username = useSelector((state) => state.userReducer.username);
  const userID = useSelector((state) => state.userReducer.id);
  const roomID = useSelector((state) => state.roomReducer.roomID);
  const input = useSelector((state) => state.gameReducer.input);

//---------------------------------- CANVAS ----------------------------------
  let drawing = false;
  let URL = "";

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");

    const draw = (event) => {
      console.log("draw");
      if (!drawing) return;
      context.lineWidth = 5;
      context.lineCap = "round";
      context.strokeStyle = "#D6EAFF";
      context.shadowColor = "dodgerblue";
      context.shadowBlur = 20;
      context.lineTo(event.offsetX, event.offsetY);
      context.stroke();
      context.beginPath();
      context.moveTo(event.offsetX, event.offsetY);
      context.imageSmoothingQuality = "high";
    };

    const start = (event) => {
      event.preventDefault();
      drawing = true;
      draw(event);
    };

    const stop = (event) => {
      event.preventDefault();
      drawing = false;
      context.beginPath();
      URL = canvasRef.current.toDataURL();
      dispatch(storeInputDAS(URL));
    };

    if (clear === true) {
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      context.beginPath();
      setClear(!clear);
    }

    canvasRef.current.onpointerdown = start;
    canvasRef.current.onpointerup = stop;
    canvasRef.current.onpointermove = draw;
  }, [clear]);
  //---------------------------------- ******* ----------------------------------

  useEffect(() => {
    setArrPosition(playersArray.indexOf(userID));
  }, [playersArray]);

  useEffect(() => {
    if (willPlay === true) {
      roomsRef
        .child(`${roomID}`)
        .child("game")
        .child("playerIDs")
        .on("value", (snapshot) => {
          let arr = [];
          snapshot.forEach((item) => {
            arr.push(Number(item.key));
          });
          setPlayersArray(arr);
          console.log("arr: ", arr);
        });
    }
  }, [willPlay]);

//----- DRAWING 
  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    let img = new Image;
    img.onload = () => {
        context.drawImage(img,0,0);
    }
    img.src = dbURL;
  }, [dbURL])

//----- GETTING URL
  useEffect(() => {
    roomsRef.child(`${roomID}`).child("game").child("books").on("child_added", snapshot => {
        setClear(!clear);
        setDbURL(snapshot.val())
    })
  }, [])

  let numCount = 0;
//----- COUNTING
  useEffect(() => {
    roomsRef.child(`${roomID}`).child("game").child("books").on("child_added", () => {
        if (numCount > playersArray.length +1) {
            setGameOver(true); //NOT WORKING 
        } else {
            numCount += 1;
            // setCounter(counter +1); //NOT WORKING
            debugger
        }
        setClear(!clear);
    })
  }, [])

//----- SENDING
  useEffect(() => {
      if (input === "") return
      roomsRef.child(`${roomID}`).child("game").child("books").child(`${userID}`).set(`${input}`);
      setClear(!clear);
  }, [bookHolder])

  const sendOver = (event) => {
    event.preventDefault();
    console.log("SEND OVER");
    if (bookHolder === 0) {
        setBookHolder(playersArray[0])
    } else {
        setBookHolder(playersArray[counter])
    }
  }
  console.log("**************************************");
  console.log("GAMEOVER", gameOver);
  console.log("COUNTER", counter);
  console.log('numCount: ', numCount);
//   console.log('dbURL: ', dbURL);
  console.log('bookHolder: ', bookHolder);

//------------------------------------- HTML -------------------------------------

  return (
    <Wrapper>
      {divBgone ? null : (
        <>
          <h1 style={{ margin: "10px" }}>Want to play Masterpiece?</h1>
          <div style={{ position: "absolute", zIndex: "1" }}>
            <StyledButton
              onClick={() => {
                roomsRef
                  .child(`${roomID}`)
                  .child("game")
                  .child("playerIDs")
                  .child(`${userID}`)
                  .set(`${username}`);
                setDivBgone(!divBgone);
                setWillPlay(true);
              }}
            >
              Yes
            </StyledButton>
            <StyledButton
              onClick={() => {
                setDivBgone(true);
                setWillPlay(false);
              }}
            >
              Nope
            </StyledButton>
          </div>
        </>
      )}
      <h1></h1>

    <canvas
        id="canvas"
        style={{ border: "1px solid magenta" }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />

    <div style={{display: "flex", justifyContent: "space-around"}} >
        <StyledButton
        onClick={() => {
          setClear(!clear);
        }}
      >
        Clear
      </StyledButton>
      {willPlay === false ? null :
      <StyledButton
        onClick={sendOver}
      >
        Send!
      </StyledButton>
    }
    </div>

    {gameOver ? 
    <StyledDiv>
     <h1>A Masterpiece!</h1>
      <img src={dbURL} />
    </StyledDiv> : null
    }
    </Wrapper>
  );
};

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const StyledButton = styled.button`
  margin: 10px;
  border-radius: 4px;
  border: 1px solid magenta;
  padding: 5px 20px;
  color: white;
  background-color: magenta;
`;

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  z-index: 1;
`;

export default DrawStory;
