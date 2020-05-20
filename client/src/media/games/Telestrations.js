import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

//------------------------------------------------------------

//globalize this
const CANVAS_SIZE = [450, 450];
//--


const Telestrations = () => {
    const canvasRef = useRef();
    const [clear, setClear] = useState(false);

    let drawing = false;

    useEffect(() => {
        const context = canvasRef.current.getContext('2d');

        const draw = (event) => {
            console.log('draw');
            if (!drawing) return;
            context.lineWidth = 10;
            context.lineCap = "round";
            context.strokeStyle = "#FFFFFF";
            context.lineTo(event.clientX - canvasRef.current.offsetLeft, event.clientY - canvasRef.current.offsetTop);
            context.stroke();
            context.beginPath();
            context.moveTo(event.clientX - canvasRef.current.offsetLeft, event.clientY - canvasRef.current.offsetTop);
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
        }

        if (clear === true) {
            console.log('clearCanvas');
            context.clearRect(0, 0, canvasRef.width, canvasRef.height);
            context.beginPath();
            setClear(!clear);
            debugger
        }

        canvasRef.current.onpointerdown = start;
        canvasRef.current.onpointerup = stop;
        canvasRef.current.onpointermove = draw;
    }, [clear])
    
    const clearSwitch = (event) => {
        event.preventDefault();
        setClear(!clear);
    }


    return (
        <div>
            {/* <div>
                <button onClick={clearSwitch}>Clear</button>
            </div> */}

            <canvas id="canvas" style={{border: "1px solid magenta"}}
                ref={canvasRef}
                width={`${CANVAS_SIZE[0]}px`}
                height={`${CANVAS_SIZE[1]}px`}
                // onClick={handleCanvasClick}
            />
        </div>
    )
}

//---------------------------------- STYLES ----------------------------------


export default Telestrations;