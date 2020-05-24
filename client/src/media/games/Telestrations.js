import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import firebase from 'firebase';
import TeleDrawing from '../../components/TeleDrawing';
import TeleWord from '../../components/TeleWord';

//------------------------------------------------------------
const useKey = (key, cb) => {
    const callbackRef = useRef(cb);

    useEffect(() => {
        callbackRef.current = cb;
    });

    useEffect(() => {
        const keyHandler = (event) => {
            if (event.code === key) {
                callbackRef.current(event);
            }
        }
        document.addEventListener("keypress", keyHandler);
        return () => document.removeEventListener("keypress", keyHandler);
    }, [key]);
}
//---------------------------------------------------------------------------------
const Telestrations = (props) => {
    console.log('props: ', props);
    const database = firebase.database();
    const roomsRef = database.ref('rooms');
    
    const [divBgone, setDivBgone] = useState(false);
    const [type, setType] = useState("word"); 
    const [bookOwner, setBookOwner] = useState(null);
    const [toDraw, setToDraw] = useState("Give a word");
    const [toGuess, setToGuess] = useState("");
    const [playersArray, setPlayersArray] = useState([]);
    const [gameplay, setGameplay] = useState(false); 
    const [exchangeBook, setExchangeBook] = useState(false);
    const [switchUp, setSwitchUp] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const username = useSelector(state => state.userReducer.username);
    const userID = useSelector(state => state.userReducer.id);
    const roomID = useSelector(state => state.roomReducer.roomID);
    const input = useSelector(state => state.gameReducer.input);

//----------------------------------------------------------------------------------
    const handleReceivePlayer = (p) => {
        if (playersArray.includes(p)) return
        playersArray.push(p);
        setPlayersArray(playersArray);
        console.log('playersArray: ', playersArray);
    }

    useEffect(() => {
        roomsRef.child(`${roomID}`).child("game").child('playerIDs').on('child_added', snapshot => {
            let player = "";
            player = snapshot.key;
            console.log('player: ', snapshot.key);
            console.log(gameplay);
            handleReceivePlayer(player);
            if (switchUp === false && !playersArray.includes(snapshot.key)) {
                setSwitchUp(true);
            }
        })
    }, [switchUp])

    const changeBookOwner = () => {
        //activate timer
        if (bookOwner === userID) {
            setGameplay(false);
            setGameOver(true);
        } else if (bookOwner === null) {
            setBookOwner(userID);
        } else {
            //find where at in array
            //when reach arr.length go to [0]
            //continue moving right
            setBookOwner();
        }
    }

    // const stopTimeout = () => {
    //     clearTimeout(playGame);
    // }

    // const playGame = setTimeout(() => {
    const sendOver = () => {
        console.log("setTimeout");
        console.log('playersArray: ', playersArray);
        if (gameplay === false) return        
        // if (bookOwner === userID) return
        if (type === "word") {
            roomsRef.child(`${roomID}`).child("game").child("books").child(`${bookOwner}`).child(`${userID}`).child(`${type}`).set(`${input}`);
            console.log('Type: ', type);
            setType("sketch");
        } else {
            roomsRef.child(`${roomID}`).child("game").child("books").child(`${bookOwner}`).child(`${userID}`).child(`${type}`).set(`${input}`)
            setType("word");
        }
    }
    // }, 15000);
    console.log('gameplay: ', gameplay);
    
//------------------------------------- HTML -------------------------------------
    useKey("Enter", sendOver);
    roomsRef.child(`${roomID}`).child("game").child("playerIDs").child(`${userID}`).onDisconnect().remove();

    if (!gameplay) {
        return (
            <Wrapper>
                {gameplay || !divBgone ? null :
                <div style={{zIndex: "1", position: "absolute"}}>
                    <StyledButton onClick={() => {
                        console.log('currentMedia: ', props.currentMedia);
                        console.log('props.sharedFiles: ', props.sharedFiles);
                        if (props.sharedFiles.includes(props.currentMedia)) {
                            setGameplay(true); //DOESN'T WORK
                            changeBookOwner();
                        }
                    }}>Start Game!</StyledButton>
                </div>
                }
                {divBgone ? null :
                <>
                    <h1 style={{margin: "10px"}}>Want to play Telestrations?</h1>
                    <div style={{position: "absolute", zIndex: "1"}}>
                        <StyledButton onClick={() => {
                                console.log("Yes!");
                                roomsRef.child(`${roomID}`).child("game").child('playerIDs').child(`${userID}`).set(`${username}`);
                                setDivBgone(!divBgone);
                        }}>Yes</StyledButton>
                        <StyledButton onClick={() => {setDivBgone(true)}}>Nope</StyledButton>
                    </div>
                </>
                }

                <TeleDrawing />
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            {type === "word" ?
                <TeleWord /> : null
            }
            {type === "sketch" ? 
                <TeleDrawing /> : null
            }
        </Wrapper>
    )
}

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