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
    const database = firebase.database();
    const roomsRef = database.ref('rooms');
    
    const [divBgone, setDivBgone] = useState(false);
    const [type, setType] = useState("word"); 
    const [bookOwner, setBookOwner] = useState("");
    const [playersArray, setPlayersArray] = useState([]);
    const [gameplay, setGameplay] = useState(false); 
    const [switchUp, setSwitchUp] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [exchange, setExchange] = useState(false);
    const [willPlay, setWillPlay] = useState(false);

    const username = useSelector(state => state.userReducer.username);
    const userID = useSelector(state => state.userReducer.id);
    const roomID = useSelector(state => state.roomReducer.roomID);
    const input = useSelector(state => state.gameReducer.input);

//----------------------------------------------------------------------------------
    const handleReceivePlayer = (p) => {
        if (playersArray.includes(p)) return
        playersArray.push(p);
        setPlayersArray(playersArray);
    }

    useEffect(() => {
        if (willPlay === true) {
            roomsRef.child(`${roomID}`).child("game").child('playerIDs').on('child_added', snapshot => {
                let player = "";
                player = snapshot.key;
                handleReceivePlayer(player);
                if (switchUp === false && !playersArray.includes(snapshot.key)) {
                    setSwitchUp(true);
                }
            })
        }
    }, [switchUp, willPlay])
    
    useEffect(() => {
        if (willPlay === true) {
            if (bookOwner === "") return
            if (type === "word") {
                roomsRef.child(`${roomID}`).child("game").child("books").child(`${bookOwner}`).child(`${userID}`).child(`${type}`).set(`${input}`);
                console.log('type: ', type);
                setType("sketch");
            } else {
                roomsRef.child(`${roomID}`).child("game").child("books").child(`${bookOwner}`).child(`${userID}`).child(`${type}`).set(`${input}`)
                setType("word");
            }
        }
    }, [bookOwner])


    const sendOver = (event) => {
        event.preventDefault();
        if (gameOver === true) return
        if (props.sharedFiles.includes(props.currentMedia)) {
            if (bookOwner === userID) {
                setGameOver(true);
            } else {
                if (bookOwner === "" && input !== "") {
                    setBookOwner(userID);
                } else {
                    //find where at in array
                    //when reach arr.length go to [0]
                    //continue moving right
                    setBookOwner("PLACEHOLDER");
                }
            }
        }
    }

//----------------------------------- NOT OWNER -----------------------------------
    useEffect(() => {
        if (!props.sharedFiles.includes(props.currentMedia) && willPlay === true && gameplay === true) {
            roomsRef.child(`${roomID}`).child("game").child('books').on('child_added', snapshot => {
                console.log('snapshot.val(): ', snapshot.val());
                // setExchange(!exchange);
                if (bookOwner === userID) {
                    setGameOver(true);
                } else {
                    if (bookOwner === "") {
                        setBookOwner(userID);
                    } else {
                        //find where at in array
                        //when reach arr.length go to [0]
                        //continue moving right
                        setBookOwner("PLACEHOLDER");
                    }
                }
            })
        }
    }, [gameplay])

    useEffect(() => {
        if (!props.sharedFiles.includes(props.currentMedia) && willPlay === true && gameplay === false) {
            console.log("++++++++++++++");
            roomsRef.child(`${roomID}`).child("game").on('child_added', snapshot => {
                console.log('snapshot.val(): ', snapshot.val());
                setGameplay(true);
            });
        }
    }, [willPlay])


    useKey("Enter", sendOver);
    console.log('gameplay: ', gameplay);
    
//------------------------------------- HTML -------------------------------------
    
    roomsRef.child(`${roomID}`).child("game").child("playerIDs").child(`${userID}`).onDisconnect().remove();
    roomsRef.child(`${roomID}`).child("game").child("books").child(`${userID}`).onDisconnect().remove();

    if (!gameplay) {
        return (
            <Wrapper>
                {!gameplay && divBgone && props.sharedFiles.includes(props.currentMedia) ?
                <div style={{zIndex: "1", position: "absolute"}}>
                    <StyledButton onClick={() => {
                        console.log('currentMedia: ', props.currentMedia);
                        console.log('props.sharedFiles: ', props.sharedFiles);
                        if (props.sharedFiles.includes(props.currentMedia)) {
                            setGameplay(true);
                            roomsRef.child(`${roomID}`).child("game").child("status").set("playing")
                        }
                    }}>Start Game!</StyledButton>
                </div> : null
                }
                {divBgone ? null :
                <>
                    <h1 style={{margin: "10px"}}>Want to play Telestrations?</h1>
                    <div style={{position: "absolute", zIndex: "1"}}>
                        <StyledButton onClick={() => {
                                console.log("Yes!");
                                roomsRef.child(`${roomID}`).child("game").child('playerIDs').child(`${userID}`).set(`${username}`);
                                setDivBgone(!divBgone);
                                setWillPlay(true);
                        }}>Yes</StyledButton>
                        <StyledButton onClick={() => {
                            setDivBgone(true)
                            setWillPlay(false);
                        }}>Nope</StyledButton>
                    </div>
                </>
                }

                <TeleDrawing />
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            {gameplay && divBgone && props.sharedFiles.includes(props.currentMedia) ?
            <StyledButton style={{position: "absolute", bottom:"0", right:"10%"}} onClick={sendOver}>Switch!</StyledButton> : null
            }
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