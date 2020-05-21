import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { storeInputTele } from '../actions';


//globalize this
const CANVAS_SIZE = [450, 450];
//--

const TeleDrawing = () => {
    const canvasRef = useRef();
    const [clear, setClear] = useState(false);
    const dispatch = useDispatch();

    let drawing = false;
    let URL = "";

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
            URL = canvasRef.current.toDataURL();
            dispatch(storeInputTele(URL));
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

        canvasRef.current.onpointerdown = start;
        canvasRef.current.onpointerup = stop;
        canvasRef.current.onpointermove = draw;
    }, [clear])

//------------------------------------- HTML -------------------------------------

    return (
        <Wrapper>
            <canvas id="canvas" style={{border: "1px solid magenta"}}
                ref={canvasRef}
                width={`${CANVAS_SIZE[0]}px`}
                height={`${CANVAS_SIZE[1]}px`}
            />

            <StyledButton onClick={() => {setClear(!clear)}}>Clear</StyledButton>
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

export default TeleDrawing;