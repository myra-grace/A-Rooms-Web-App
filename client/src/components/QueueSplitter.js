import React, {useContext} from 'react';
import styled from 'styled-components';


const QueueSplitter = (props) => {

    return (
        <div style={{margin: "10px"}}>
            {props.v[0] === "Telestrations" ? 
            <StyledImg src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Pencil_vector.svg"/> : null
            }
            {props.v[0] === "Snake" ? 
            <StyledImg src="https://www.publicdomainpictures.net/pictures/90000/velka/cobra-snake-poisonous.jpg"/> : null
            }
            {props.k[0] === "image" ? 
            <StyledImg src={props.v[0]} /> : null
            }
            {props.k[0] === "audio" ? 
            <StyledImg src={"https://storage.needpix.com/rsynced_images/audio-3610027_1280.png"} /> : null
            }
        </div>
    )
}

const StyledImg = styled.img`
    background: dodgerblue;
    border-radius: 8px;
    width: 90px;
    height: 90px;
    object-fit: cover;

    background-image : linear-gradient(0deg, rgba(63,171,251,1) 0%, rgba(198,70,252,1) 90%);
`;

export default QueueSplitter;