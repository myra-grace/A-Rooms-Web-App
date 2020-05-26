import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import firebase from "firebase";
import TeleDrawing from "../../components/TeleDrawing";
import TeleWord from "../../components/TeleWord";

//---------------------------------------------------------------------------------
const Telestrations = (props) => {
  const database = firebase.database();
  const roomsRef = database.ref("rooms");

  const [divBgone, setDivBgone] = useState(false);
  const [type, setType] = useState("word");
  const [bookOwner, setBookOwner] = useState("");
  const [playersArray, setPlayersArray] = useState([]);
  const [gameplay, setGameplay] = useState(false);
  const [switchUp, setSwitchUp] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [bookNum, setBookNum] = useState(0);
  const [willPlay, setWillPlay] = useState(false);
  const [round, setRound] = useState(0);

  const username = useSelector((state) => state.userReducer.username);
  const userID = useSelector((state) => state.userReducer.id);
  const roomID = useSelector((state) => state.roomReducer.roomID);
  const input = useSelector((state) => state.gameReducer.input);

  //----------------------------------------------------------------------------------

  useEffect(() => {
    setBookNum(playersArray.indexOf(userID));
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

  useEffect(() => {
    //IT'S ADDING ON TOP
    console.log("BBBBBBBBBB bookOwner: ", bookOwner);
    debugger;
    if (willPlay === true) {
      if (bookOwner === "") return;
      if (type === "word") {
        roomsRef
          .child(`${roomID}`)
          .child("game")
          .child("books")
          .child(`${bookOwner}`)
          .child(`${userID}`)
          .child(`${type}`)
          .set(`${input}`);
        console.log("type: ", type);
        setType("sketch");
      } else {
        roomsRef
          .child(`${roomID}`)
          .child("game")
          .child("books")
          .child(`${bookOwner}`)
          .child(`${userID}`)
          .child(`${type}`)
          .set(`${input}`);
        setType("word");
      }
    }
  }, [bookOwner]);

  useEffect(() => {
      if (!props.sharedFiles.includes(props.currentMedia)) return
    if (props.sharedFiles.includes(props.currentMedia)) {
        roomsRef
        .child(`${roomID}`)
        .child("game")
        .child("status")
        .child(`${round}`)
        .set("round");
    }
  }, [round])

  const sendOver = (event) => {
    event.preventDefault();
    // if (gameOver === true) return
    debugger;
    if (props.sharedFiles.includes(props.currentMedia)) {
        setRound(round + 1);
      // if (bookOwner === userID) {
      //     setGameOver(true);
      // } else {
      if (bookOwner === "" && input !== "") {
        setBookOwner(userID);
      } else {
        if (bookNum >= playersArray.length - 1) {
          setBookNum(0);
        } else {
          setBookNum(bookNum + 1);
        }
        setBookOwner(playersArray[bookNum]);
      }
      // }
    }
  };

  //----------------------------------- NOT OWNER -----------------------------------
  useEffect(() => {
    roomsRef
      .child(`${roomID}`)
      .child("game")
      .child("status")
      .on("child_added", (snapshot) => {
        debugger;
        if (
          !props.sharedFiles.includes(props.currentMedia) &&
          willPlay === true &&
          gameplay === true
        ) {
          console.log("@@@@@@@##snapshot: ", snapshot);
          // if (bookOwner === userID) {
          //     console.log('bookOwner: ', bookOwner);
          //     // setGameOver(true);
          // } else {
          if (bookOwner === "") {
            setBookOwner(userID);
          } else {
            if (bookNum >= playersArray.length - 1) {
              setBookNum(0);
            } else {
              setBookNum(bookNum + 1);
            }
            setBookOwner(playersArray[bookNum]);
          }
          // }
        }
      });
  }, [switchUp]); 

  useEffect(() => {
    roomsRef
      .child(`${roomID}`)
      .child("game")
      .child("status")
      .once("child_added", (snapshot) => {
        if (
          !props.sharedFiles.includes(props.currentMedia) &&
          willPlay === true &&
          gameplay === false
        ) {
          setSwitchUp(!switchUp);
        }
      });
  }, []);

  useEffect(() => {
    roomsRef
      .child(`${roomID}`)
      .child("game")
      .child("status")
      .once("child_added", (snapshot) => {
        if (
          !props.sharedFiles.includes(props.currentMedia) &&
          willPlay === true &&
          gameplay === false
        ) {
          console.log("snapshot.val(): ", snapshot.val());
          setGameplay(true);
        }
      });
  }, [willPlay]);

  console.log("OUTSIDE playersArray: ", playersArray);
  console.log("gameOver: ", gameOver);
  console.log("gameplay: ", gameplay);
  console.log("userID: ", userID);
  console.log("bookNum: ", bookNum);
  console.log("bookOwner: ", bookOwner);

  //------------------------------------- HTML -------------------------------------

  roomsRef
    .child(`${roomID}`)
    .child("game")
    .child("playerIDs")
    .child(`${userID}`)
    .onDisconnect()
    .remove();
  roomsRef
    .child(`${roomID}`)
    .child("game")
    .child("books")
    .child(`${userID}`)
    .onDisconnect()
    .remove();

  if (!gameplay) {
    return (
      <Wrapper>
        {!gameplay &&
        divBgone &&
        props.sharedFiles.includes(props.currentMedia) ? (
          <div style={{ zIndex: "1", position: "absolute" }}>
            <StyledButton
              onClick={() => {
                if (props.sharedFiles.includes(props.currentMedia)) {
                  setGameplay(true);
                  roomsRef
                    .child(`${roomID}`)
                    .child("game")
                    .child("status")
                    .child(`${round}`)
                    .set("round");
                }
              }}
            >
              Start Game!
            </StyledButton>
          </div>
        ) : null}
        {divBgone ? null : (
          <>
            <h1 style={{ margin: "10px" }}>Want to play Telestrations?</h1>
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

        <TeleDrawing />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {gameplay &&
      divBgone &&
      props.sharedFiles.includes(props.currentMedia) ? (
        <StyledButton
          style={{ position: "absolute", bottom: "0", right: "10%" }}
          onClick={sendOver}
        >
          Switch!
        </StyledButton>
      ) : null}
      {type === "word" ? <TeleWord /> : null}
      {type === "sketch" ? <TeleDrawing /> : null}
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

export default Telestrations;
