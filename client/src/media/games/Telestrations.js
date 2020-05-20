import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import firebase from 'firebase';


//------------------------------------------------------------

//globalize this
const CANVAS_SIZE = [450, 450];
//--


const Telestrations = () => {
    const database = firebase.database();
    const roomsRef = database.ref('rooms');
    const canvasRef = useRef();
    const [roundCounter, setRoundCounter] = useState(0);
    const [wordInput, setWordInput] = useState('');
    const [clear, setClear] = useState(false);
    const [type, setType] = useState("sketch"); //CHANGE TO "word"
    const [bookOwner, setBookOwner] = useState(null);
    const [toDraw, setToDraw] = useState("Give a word");
    const [toGuess, setToGuess] = useState("");
    const [playersArray, setPlayersArray] = useState([]);
    const [gameplay, setGameplay] = useState(true); //change to false
    const [exchangeBook, setExchangeBook] = useState(false);
    const userID = useSelector(state => state.userReducer.id);
    const roomID = useSelector(state => state.roomReducer.roomID);
//----------------------------------------------------------------------------------

    const startGame = () => {
        setGameplay(true)
    }

    // setTimeout(() => {
    //     roomsRef.child(`${roomID}`).child("game").child('players').set(`${playersArray}`)
    // }, 10000);

    // if (gameplay === false) return

    //retrieve who's book's ID
    // move input to bottom = need to see friend's drawing and guess it
    // figure out why doesn't work w/ touch screen

    let drawing = false;
    const maxCharacters = 15;

    const handleInput = (event) => {
        event.preventDefault();
        const userTyped = event.target.value;
        if (wordInput.length >= maxCharacters) return
        setWordInput(userTyped);
        console.log('word: ', wordInput);
        //send word to db at end of interval
        //rooms/roomID/game/whosBookID/{userID:input} -> 
        //  (input: word/drawing coordinates)
        // slideshow results (of everyone? but if >6 then only own) when done round then
        //destroy /game folder when end game

        //when rendering, if input is an array, map for canvas. Else, put word in <p>
    }



    // setInterval(() => {
    //     //real-time countdown in corner
    //     if (exchange === false) {
    //         //if click spacebar do nothing
    //         setExchange(true);
    //         // exchange = true;

    //         console.log('word: ', word);
    //         console.log('exchange: ', exchange);
    //     }

    //     setWord('');
    //     setExchange(false);
    //     // exchange = false;
    // }, 10000);




    // useEffect(() => {
    //     const context = canvasRef.current.getContext('2d');
    //     let coordinates = "";

    //     //grab coordinates from db
    //     coordinates = `const canvasCoor = () => {
    //         ${stringFromDB}
    //     }`
    
    //     eval(coordinates);
    //     canvasCoor();

    //     //have this called when exchange b/t players happens
    // }, [])



    useEffect(() => {
        const context = canvasRef.current.getContext('2d');

        const draw = (event) => {
            console.log('draw');
            if (!drawing) return;
            context.lineWidth = 5;
            context.lineCap = "round";
            context.strokeStyle = '#D6EAFF';
            context.shadowColor = 'dodgerblue';
            context.shadowBlur = 20;
            context.lineTo(event.clientX - canvasRef.current.offsetLeft, event.clientY - canvasRef.current.offsetTop);
            context.stroke();
            context.beginPath();
            context.moveTo(event.clientX - canvasRef.current.offsetLeft, event.clientY - canvasRef.current.offsetTop);
            context.imageSmoothingQuality = "high";
        }

        const start = (event) => {
            console.log('start');
            event.preventDefault();
            drawing = true;
            draw(event);
        }

        const stop = (event) => {
            console.log('stop');
            event.preventDefault();
            drawing = false;
            context.beginPath();
            //when time ends, call this
            // console.log(canvasRef.current.toDataURL());
            // setInput(canvasRef.current.toDataURL());
        }

        if (clear === true) {
            console.log('clearCanvas');
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            context.beginPath();
            setClear(!clear);
        }


        let theInput = "";
        const handleInputToSend = () => {
            if (type === "word") {
                theInput = wordInput
            } else {
                theInput = canvasRef.current.toDataURL(); 
            }
        }

        const handleType = () => {
            if (type === "word") {
                setType("sketch")
            } else {
                setType("word")
            }
        }

        const endGame = () => {
            console.log('FULL CIRCLE OF LIFE');
            setGameplay(false);
        }
    
        const endRound = () => {
            // turn off listeners?
            // stop(); //necessary?
            handleInputToSend();
            //when game is up to play, asks if wanna play (5 sec) -> yes puts ID into array of players
            if (bookOwner === userID) {
                endGame();
            } else if (bookOwner === null) {
                setBookOwner(userID);
            }
            
            roomsRef.child(`${roomID}`).child("game").child(`${bookOwner}`).child(`${userID}`).child(`${type}`).set(`${theInput}`)
            
            console.log('MOVE RIGHT');
            //go right in players array and setBookOwner as that
            // then setRoundCounter(roundcounter += 1)
            handleType();
            setClear(!clear);
        }
        document.getElementById("send").addEventListener('click', endRound) //CHANGE FOR TIMEOUT

        // if (type === "sketch") {
            canvasRef.current.onpointerdown = start;
            canvasRef.current.onpointerup = stop;
            canvasRef.current.onpointermove = draw;
        // }
    }, [clear])



    return (
        <Wrapper>
            <h1 style={{margin: "10px"}}>{toDraw}</h1>
            {/* {exchange === false ? 
            <form style={{zIndex: "1", position: "absolute"}}>
                <StyledInput id="userInputTele" type="text" placeholder="Type in a word" autocomplete="nope" value={word} onChange={handleInput}></StyledInput>
            </form> : null
            } */}

            <canvas id="canvas" style={{border: "1px solid magenta"}}
                ref={canvasRef}
                width={`${CANVAS_SIZE[0]}px`}
                height={`${CANVAS_SIZE[1]}px`}
            />
            {/* <img src={toGuess} style={{zIndex: "1"}}
                width={`${CANVAS_SIZE[0]}px`}
                height={`${CANVAS_SIZE[1]}px`}
            /> */}

            <div style={{margin: "10px"}}>
                <button onClick={() => {setClear(!clear)}}>Clear</button>
                <button id="send">send</button>
            </div>
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

const StyledInput = styled.input`
    text-align: center;
    width: 100%;
    border-radius: 4px 0 0 4px;
    border: 1px solid magenta;
    padding: 10px;
    color: #c4b1ab;
    background-color: transparent;
`;

export default Telestrations;