import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import firebase from 'firebase';
//------------------------------------------------------------

//globalize this
const CANVAS_SIZE = [450, 450];
//--

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
    const canvasRef = useRef();
    const [roundSwitch, setRoundSwitch] = useState(false);
    const [divBgone, setDivBgone] = useState(false);
    const [wordInput, setWordInput] = useState('');
    const [clear, setClear] = useState(false);
    const [type, setType] = useState(""); 
    const [bookOwner, setBookOwner] = useState(null);
    const [toDraw, setToDraw] = useState("Give a word");
    const [toGuess, setToGuess] = useState("");
    const [playersArray, setPlayersArray] = useState([]);
    const [gameplay, setGameplay] = useState(false); //change to false
    const [exchangeBook, setExchangeBook] = useState(false);
    const username = useSelector(state => state.userReducer.username);
    const userID = useSelector(state => state.userReducer.id);
    const roomID = useSelector(state => state.roomReducer.roomID);


//----------------------------------------------------------------------------------

    const handleReceivePlayerIDs = (id) => {
        setPlayersArray(playersArray.concat(id));
        
    };

    useEffect(() => {
        let player = [];
        setClear(!clear);
        roomsRef.child(`${roomID}`).child("game").child('playerIDs').on('child_added', snapshot => {
            player = snapshot.val();
            handleReceivePlayerIDs(player)
            console.log('player: ', player);
        })
    }, [])

    // const stopTimeout = () => {
    //     clearTimeout(playGame);
    // }

    const playGame = setTimeout(() => {
        console.log("setTimeout");
        console.log('playersArray: ', playersArray);
        setGameplay(true)
        // handleSubmit()
        
        if (type === "") {
            setType("word");
        } else if (type === "word") {
            roomsRef.child(`${roomID}`).child("game").child("books").child(`${bookOwner}`).child(`${userID}`).child(`${type}`).set(`${wordInput}`);
            setWordInput("");
            console.log('Type: ', type);
            setType("sketch");
        } else {
            handleInputToSend();
            console.log('theInput: ', theInput);
            roomsRef.child(`${roomID}`).child("game").child("books").child(`${bookOwner}`).child(`${userID}`).child(`${type}`).set(`${theInput}`)
            setClear(!clear);
            setType("word");
        }
        // setRoundSwitch(!roundSwitch)
    }, 10000);
    

    let theInput = "";
    const handleInputToSend = () => {
        theInput = canvasRef.current.toDataURL(); 
    }

    const handleSubmit = () => {
        // event.preventDefault()
        console.log("Submitted");
        if (bookOwner === userID) {
            console.log('FULL CIRCLE OF LIFE');
            setGameplay(false);
        } else if (bookOwner === null) {
            setBookOwner(userID);
        }

        if (type === "word") {
            roomsRef.child(`${roomID}`).child("game").child("books").child(`${bookOwner}`).child(`${userID}`).child(`${type}`).set(`${wordInput}`);
            setWordInput("");
            console.log('Type: ', type);
        }

        if (type === "sketch") {
            handleInputToSend();
            console.log('theInput: ', theInput);
            roomsRef.child(`${roomID}`).child("game").child("books").child(`${bookOwner}`).child(`${userID}`).child(`${type}`).set(`${theInput}`)
            setClear(!clear);
        }
    }

    // if (gameplay === false) return

    //retrieve who's book's ID
    // move input to bottom = need to see friend's drawing and guess it
    // figure out why doesn't work w/ touch screen


    let counter = 10;

    const countdownFromTen = setInterval(() => {
        // document.getElementById("timer").textContent = counter //HELP
        counter--
        if (counter === -1) {
            counter = 10;
        }
    }, 1000); //HELP. MESSES UP AFTER INTERACTING WITH GAME seems like there are double and one's behind
    
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
    const maxCharacters = 15;

    const handleInput = (event) => {
        event.preventDefault();
        const userTyped = event.target.value;
        if (wordInput.length >= maxCharacters) return
        setWordInput(userTyped);
        console.log('word: ', wordInput);
        //send word to db at end of interval
        //rooms/roomID/game/whosBookID/{userID:input} -> 
        // slideshow results (of everyone? but if >6 then only own) when done round then
        //destroy /game folder when end game

        //when rendering, if input is an array, map for canvas. Else, put word in <p>
    }
//------------------------------------ SKETCH ------------------------------------
    let drawing = false;

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
    
        const endRound = () => {
            // turn off listeners?
            // stop(); //necessary?
            //when game is up to play, asks if wanna play (5 sec) -> yes puts ID into array of players
            
            // roomsRef.child(`${roomID}`).child("game").child("rounds").child(`${bookOwner}`).child(`${userID}`).child(`${type}`).set(`${theInput}`)
            
            console.log('MOVE RIGHT');
            //go right in players array and setBookOwner as that
            // then setRoundCounter(roundcounter += 1)
        }

        // document.getElementById("send").addEventListener('click', endRound) //CHANGE FOR TIMEOUT

        if (type === "sketch") {
            canvasRef.current.onpointerdown = start;
            canvasRef.current.onpointerup = stop;
            canvasRef.current.onpointermove = draw;
        }
    }, [clear, type])

    useKey("Enter", handleSubmit);
//------------------------------------- HTML -------------------------------------

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
                        }}>Yes</StyledButton>
                        <StyledButton onClick={() => {setDivBgone(true)}}>Nope</StyledButton>
                    </div>
                </>
                }

                {/* <div>
                    <h1>word</h1>
                    <img src={}/>
                </div> */}

                <canvas id="canvas" style={{border: "1px solid magenta"}}
                    ref={canvasRef}
                    width={`${CANVAS_SIZE[0]}px`}
                    height={`${CANVAS_SIZE[1]}px`}
                />
                <StyledButton onClick={() => {setClear(!clear)}}>Clear</StyledButton>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <h1 style={{margin: "10px"}}>{toDraw}</h1>
            {type === "word" ? 
            <form style={{zIndex: "1", position: "absolute"}}>
                <StyledInput id="userInputTele" type="text" placeholder="Type in a word" autocomplete="nope" value={wordInput} onChange={handleInput}></StyledInput>
            </form> : null
            }

            <canvas id="canvas" style={{border: "1px solid magenta"}}
                ref={canvasRef}
                width={`${CANVAS_SIZE[0]}px`}
                height={`${CANVAS_SIZE[1]}px`}
            />
            {/* <img src={toGuess} style={{zIndex: "1"}}
                width={`${CANVAS_SIZE[0]}px`}
                height={`${CANVAS_SIZE[1]}px`}
            /> */}

            <div style={{margin: "10px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around"}}>
                <p id="timer" style={{width: "20px", height: "20px", alignItems: "center"}}>10</p>
                <StyledButton onClick={() => {setClear(!clear)}}>Clear</StyledButton>
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

const StyledButton = styled.button`
    margin: 10px;
    border-radius: 4px;
    border: 1px solid magenta;
    padding: 5px 20px;
    color: white;
    background-color: magenta;
`;

const StyledInput = styled.input`
    text-align: center;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #FFD9FE;
    box-shadow: 0 0 10px 10px magenta;
    padding: 10px;
    color: #c4b1ab;
    background-color: transparent;
`;

export default Telestrations;