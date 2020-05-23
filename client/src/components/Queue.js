import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import firebase from 'firebase';
import QueueSplitter from "./QueueSplitter";


const Queue = () => {
    const database = firebase.database();
    const roomsRef = database.ref('rooms');
    const [itemsInQueueDiv, setItemsInQueueDiv] = useState([]);
    const [switchUp, setSwitchUp] = useState(false);
    const roomID = useSelector(state => state.roomReducer.roomID);
    //render thumbnails in queue box


    const handleReceiveQueue = (item) => {
        if (itemsInQueueDiv.includes(item)) return
        itemsInQueueDiv.push(item);
        setItemsInQueueDiv(itemsInQueueDiv);
    }

    
    useEffect(() => {
        roomsRef.child(`${roomID}`).child("queue").on('child_added', snapshot => {
            let item = {};
            item = snapshot.val();
            handleReceiveQueue(item);
            if (switchUp === false) {
                setSwitchUp(true);
            }
        });
    }, [switchUp])


    return (
        <Wrapper>
                {itemsInQueueDiv.map((thumbnail) => {
                console.log('thumbnail: ', thumbnail);
                return (
                    <QueueSplitter k={Object.keys(thumbnail)} v={Object.values(thumbnail)}/>
                )
            })}
        </Wrapper>
    )
}

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    margin: 5%;
    max-width: 100%;
    max-height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    opacity: 0.5;
`;

export default Queue;