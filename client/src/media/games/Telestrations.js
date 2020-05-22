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
const Telestrations = () => {
    const database = firebase.database();
    const roomsRef = database.ref('rooms');
    const [divBgone, setDivBgone] = useState(false);
    const [type, setType] = useState("word"); 
    const [bookOwner, setBookOwner] = useState(null);
    const [toDraw, setToDraw] = useState("Give a word");
    const [toGuess, setToGuess] = useState("");
    const [playersArray, setPlayersArray] = useState([]);
    const [gameplay, setGameplay] = useState(false); //change to false
    const [exchangeBook, setExchangeBook] = useState(false);
    const username = useSelector(state => state.userReducer.username);
    const userID = useSelector(state => state.userReducer.id);
    const roomID = useSelector(state => state.roomReducer.roomID);
    const input = useSelector(state => state.gameReducer.input);


//----------------------------------------------------------------------------------

    const handleReceivePlayerIDs = (id) => {
        setPlayersArray(playersArray.concat(id));
        
    };

    useEffect(() => {
        let player = [];
        roomsRef.child(`${roomID}`).child("game").child('playerIDs').on('child_added', snapshot => {
            player = snapshot.val();
            handleReceivePlayerIDs(player)
            console.log('player: ', player);
            console.log(gameplay);
        })
        console.log(type);
    }, [])

    // const stopTimeout = () => {
    //     clearTimeout(playGame);
    // }

    // const playGame = setTimeout(() => {
    const sendOver = () => {
        console.log("setTimeout");
        console.log('playersArray: ', playersArray);
        setGameplay(true)        
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


    // if (gameplay === false) return

    //retrieve who's book's ID
    // move input to bottom = need to see friend's drawing and guess it
    // figure out why doesn't work w/ touch screen


    // let counter = 15;

    // const countdownFromTen = setInterval(() => {
    //     // document.getElementById("timer").textContent = counter //HELP
    //     counter--
    //     if (counter === -1) {
    //         counter = 15;
    //     }
    // }, 1500); //HELP. MESSES UP AFTER INTERACTING WITH GAME seems like there are double and one's behind
    
    // setInterval(() => {
    //     console.log("ZER0!");
    // //     //real-time countdown in corner
    // //     if (exchange === false) {
    // //         //if click spacebar do nothing
    // //         setExchange(true);
    // //         // exchange = true;

    // //         console.log('word: ', word);
    // //         console.log('exchange: ', exchange);
    // //     }

    // //     setWord('');
    // //     setExchange(false);
    // //     // exchange = false;
    // }, 11 * 1000);

//------------------------------------- WORD -------------------------------------
    //send word to db at end of interval
    //rooms/roomID/game/whosBookID/{userID:input} -> 
    // slideshow results (of everyone? but if >6 then only own) when done round then
    //destroy /game folder when end game
//------------------------------------ SKETCH ------------------------------------
    
//------------------------------------- HTML -------------------------------------
    useKey("Enter", sendOver);

    if (!gameplay) {
        return (
            <Wrapper>
                {divBgone ? null :
                <>
                    <h1 style={{margin: "10px"}}>Want to play Telestrations?</h1>
                    <div style={{position: "absolute", zIndex: "1"}}>
                        <StyledButton onClick={() => {
                                console.log("Yes!");
                                roomsRef.child(`${roomID}`).child("game").child('playerIDs').push(`${userID}`);
                                setDivBgone(!divBgone);
                                setGameplay(true);
                                console.log('gameplay: ', gameplay);
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