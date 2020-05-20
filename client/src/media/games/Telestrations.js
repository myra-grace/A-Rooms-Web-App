import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

//------------------------------------------------------------

//globalize this
const CANVAS_SIZE = [450, 450];
//--


const Telestrations = () => {
    const canvasRef = useRef();
    const [exchange, setExchange] = useState(false);
    const [word, setWord] = useState('');
    const [clear, setClear] = useState(false);
    const [trace, setTrace] = useState([]);
    //retrieve who's book's ID
    // move input to bottom = need to see friend's drawing and guess it
    // figure out why doesn't work w/ touch screen

    // let exchange = false;
    let drawing = false;
    const maxCharacters = 15;

    const handleInput = (event) => {
        event.preventDefault();
        const userTyped = event.target.value;
        if (word.length >= maxCharacters) return
        setWord(userTyped);
        console.log('word: ', word);
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
            let location = "";
            let drawingCoordinates = [];
    
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
    
                // console.log(`x: ${event.clientX - canvasRef.current.offsetLeft}, y: ${event.clientY - canvasRef.current.offsetTop}`);
                location = `lineTo[${event.clientX - canvasRef.current.offsetLeft}, ${event.clientY - canvasRef.current.offsetTop}]`;
                drawingCoordinates.push(location);
            }
    
            const start = (event) => {
                console.log('start');
                event.preventDefault();
                drawing = true;
                draw(event);
                //push to array ->
                location = `moveTo[${event.clientX - canvasRef.current.offsetLeft}, ${event.clientY - canvasRef.current.offsetTop}]`;
                drawingCoordinates.push(location);
            }
    
            const stop = (event) => {
                console.log('stop');
                event.preventDefault();
                drawing = false;
                context.beginPath();
                console.log(canvasRef.current.toDataURL());
            }
    
            if (clear === true) {
                console.log('clearCanvas');
                context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                context.beginPath();
                setClear(!clear);
            }
        
    
            // if (exchange === true) {
                canvasRef.current.onpointerdown = start;
                canvasRef.current.onpointerup = stop;
                canvasRef.current.onpointermove = draw;
            // }

            console.log('drawingCoordinates: ', drawingCoordinates);
        }, [clear])



    return (
        <Wrapper>
            <div style = {{margin: "10px"}}>
                <button onClick={() => {setClear(true)}}>Clear</button>
            </div>

            <canvas id="canvas" style={{border: "1px solid magenta"}}
                ref={canvasRef}
                width={`${CANVAS_SIZE[0]}px`}
                height={`${CANVAS_SIZE[1]}px`}
                // onClick={handleCanvasClick}
            />

            {/* {exchange === false ? 
            <form style={{zIndex: "1", position: "absolute"}}>
                <StyledInput id="userInputTele" type="text" placeholder="Give a word to draw" autocomplete="nope" value={word} onChange={handleInput}></StyledInput>
            </form> : null
            } */}
            
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